const fs = require('fs');

describe('CognIQ Application', () => {

  beforeEach(() => {
    const html = fs.readFileSync('index.html', 'utf-8');
    document.documentElement.innerHTML = html.toString();

    // We need to execute the inline scripts from the loaded HTML
    const scriptElements = document.getElementsByTagName('script');
    for (let script of scriptElements) {
      if (script.innerHTML) {
        // Execute the script content within the global context
        // This makes functions like doSetup, gS, calcIQ available on window
        window.eval(script.innerHTML);
      }
    }

    // Mock for gS
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    // Clean up timers or intervals the app might start
    if (window.S && window.S.tid) {
      clearInterval(window.S.tid);
    }
    jest.clearAllTimers();
    // Clear DOM state
    document.documentElement.innerHTML = '';
  });

  describe('Screen Navigation (gS)', () => {
    it('should show the requested screen and hide others', () => {
      // Setup is default
      expect(document.getElementById('s-home').classList.contains('on')).toBe(true);
      expect(document.getElementById('s-setup').classList.contains('on')).toBe(false);

      // Go to setup
      window.gS('s-setup');
      expect(document.getElementById('s-setup').classList.contains('on')).toBe(true);
      expect(document.getElementById('s-home').classList.contains('on')).toBe(false);

      // Go to test
      window.gS('s-test');
      expect(document.getElementById('s-test').classList.contains('on')).toBe(true);
      expect(document.getElementById('pw').style.display).toBe('block');

      // Go to results
      window.gS('s-results');
      expect(document.getElementById('s-results').classList.contains('on')).toBe(true);
      expect(document.getElementById('pw').style.display).toBe('none');
      expect(document.getElementById('hdr-r').innerHTML).toBe('Assessment Complete');
    });
  });

  describe('Core Logic', () => {
    describe('shuf', () => {
      it('should shuffle an array without modifying the original', () => {
        const arr = [1, 2, 3, 4, 5];
        const shuffled = window.shuf(arr);

        expect(shuffled).toHaveLength(5);
        expect(shuffled).toEqual(expect.arrayContaining(arr));
        expect(arr).toEqual([1, 2, 3, 4, 5]); // Original unchanged
      });
    });

    describe('calcIQ', () => {
      it('should return 100 if mx is 0', () => {
        expect(window.calcIQ(0, 0, 25)).toBe(100);
      });

      it('should calculate IQ properly with age adjustments', () => {
        // High score, young
        expect(window.calcIQ(50, 60, 12)).toBeGreaterThan(100);

        // Perfect score
        expect(window.calcIQ(60, 60, 25)).toBe(162); // Max limit

        // Zero score
        expect(window.calcIQ(0, 60, 25)).toBe(60); // Min limit
      });
    });

    describe('clsIQ', () => {
      it('should classify IQ scores correctly', () => {
        expect(window.clsIQ(145)).toBe('Genius / Profoundly Gifted');
        expect(window.clsIQ(135)).toBe('Gifted');
        expect(window.clsIQ(125)).toBe('Superior Intelligence');
        expect(window.clsIQ(115)).toBe('High Average');
        expect(window.clsIQ(100)).toBe('Average');
        expect(window.clsIQ(85)).toBe('Low Average');
        expect(window.clsIQ(75)).toBe('Borderline');
        expect(window.clsIQ(65)).toBe('Below Average');
      });
    });

    describe('pct', () => {
      it('should calculate percentile based on IQ', () => {
        expect(window.pct(100)).toBe(50);
        expect(window.pct(130)).toBeGreaterThan(50);
        expect(window.pct(70)).toBeLessThan(50);

        // Boundaries
        expect(window.pct(200)).toBe(99); // Max
        expect(window.pct(0)).toBe(1);   // Min
      });
    });
  });

  describe('showResults Integration', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      // Setup mock state
      window.S = {
        name: 'John Doe',
        age: 30,
        qs: [],
        idx: 60,
        answers: [
          { c: 'LA', p: 1, ok: true, t: 15, pts: 1, max: 1 },
          { c: 'LA', p: 2, ok: false, t: 25, pts: 0, max: 2 },
          { c: 'MA', p: 3, ok: true, t: 40, pts: 3, max: 3 },
          { c: 'PS', p: 1, ok: true, t: 20, pts: 1, max: 1 },
          { c: 'VR', p: 2, ok: true, t: 30, pts: 2, max: 2 },
          { c: 'WM', p: 3, ok: false, t: 50, pts: 0, max: 3 },
          { c: 'SP', p: 1, ok: true, t: 10, pts: 1, max: 1 },
          { c: 'SR', p: 2, ok: true, t: 35, pts: 2, max: 2 }
        ],
        chosen: null,
        tid: null,
        elapsed: 0
      };
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should navigate to the results screen and display correct header', () => {
      window.showResults();
      expect(document.getElementById('s-results').classList.contains('on')).toBe(true);
      expect(document.getElementById('rlb').textContent).toBe("John Doe's IQ Result");
    });

    it('should calculate and render the correct IQ, class, and percentile', () => {
      window.showResults();

      // Advance timers to complete number animation
      jest.runAllTimers();

      // Given the answers: raw pts = 1+0+3+1+2+0+1+2 = 10. max = 1+2+3+1+2+3+1+2 = 15. ratio = 10/15 = 0.666
      // Age 30: adj = 0
      // ap = 0.666
      // IQ = 100 + 15 * (ln(0.666 / 0.333) / 1.05) ~ 110
      const expectedIQ = window.calcIQ(10, 15, 30);

      expect(document.getElementById('rsco').textContent).toBe(expectedIQ.toString());
      expect(document.getElementById('rcls').textContent).toBe(window.clsIQ(expectedIQ));

      const p = window.pct(expectedIQ);
      expect(document.getElementById('rpct').textContent).toContain(`Top ${100-p}%`);
      expect(document.getElementById('rpct').textContent).toContain(`${p}th percentile`);
    });

    it('should render domain percentage cards correctly', () => {
      window.showResults();

      const grid = document.getElementById('dom-grid');
      const cards = grid.querySelectorAll('.dom-card');

      // 7 domains should be rendered
      expect(cards.length).toBe(7);

      // LA: 1/3 = 33%
      // MA: 3/3 = 100%
      // PS: 1/1 = 100%
      // VR: 2/2 = 100%
      // WM: 0/3 = 0%
      // SP: 1/1 = 100%
      // SR: 2/2 = 100%

      // We can check if at least one card has 33% and one has 100%
      const html = grid.innerHTML;
      expect(html).toContain('33%');
      expect(html).toContain('100%');
      expect(html).toContain('0%');
    });

    it('should render population comparison rows', () => {
      window.showResults();

      const popRows = document.getElementById('pop-rows');
      const rows = popRows.querySelectorAll('.pop-row');

      // 7 domain comparison rows
      expect(rows.length).toBe(7);

      // Test animation classes/styles are applied after timeout
      jest.runAllTimers();

      const youBars = popRows.querySelectorAll('.pop-you-bar');
      // Should have data-w attribute translated to width style
      expect(youBars[0].style.width).toMatch(/%/);
    });

    it('should highlight the correct row in the IQ classification scale', () => {
      window.showResults();
      const expectedIQ = window.calcIQ(10, 15, 30); // ~110 (High Average)

      const table = document.getElementById('rref');
      const highlightedRow = table.querySelector('tr.hl');

      expect(highlightedRow).not.toBeNull();
      // For ~110, it should be High Average (110-119)
      expect(highlightedRow.innerHTML).toContain('High Average');
    });
  });

  describe('doSetup Validation', () => {

    it('should reject invalid age under 10', () => {
      jest.useFakeTimers();
      const ageInput = document.getElementById('iage');
      ageInput.value = '5';

      window.doSetup();

      expect(ageInput.style.borderColor).toMatch(/#b83232/i);
      expect(ageInput.placeholder).toBe('Enter age 10 to 80');

      jest.runAllTimers();
      expect(ageInput.style.borderColor).toBe('');
      jest.useRealTimers();
    });

    it('should reject invalid age over 80', () => {
      jest.useFakeTimers();
      const ageInput = document.getElementById('iage');
      ageInput.value = '85';

      window.doSetup();

      expect(ageInput.style.borderColor).toMatch(/#b83232/i);
      expect(ageInput.placeholder).toBe('Enter age 10 to 80');

      jest.runAllTimers();
      expect(ageInput.style.borderColor).toBe('');
      jest.useRealTimers();
    });

    it('should accept valid age and initialize test state', () => {
      document.getElementById('iage').value = '25';
      document.getElementById('iname').value = 'TestUser';

      window.doSetup();

      expect(window.S.name).toBe('TestUser');
      expect(window.S.age).toBe(25);
      expect(window.S.qs.length).toBeGreaterThan(0);
      expect(window.S.idx).toBe(0);
      expect(window.S.answers).toEqual([]);
      expect(window.S.chosen).toBeNull();

      // It should call gS('s-test') and renderQ()
      expect(document.getElementById('s-test').classList.contains('on')).toBe(true);

      // The question array is shuffled, so we can't reliably predict the exact question category string
      // Just assert it has *some* string value set from the category config map
      expect(document.getElementById('qtag').textContent.length).toBeGreaterThan(0);
      expect(document.getElementById('qtag').textContent).not.toBe('Loading');
    });
  });
});
