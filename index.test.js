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

  describe('showResults Function', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should calculate and display results correctly', () => {
      window.S.name = 'Alice';
      window.S.age = 25;
      window.S.answers = [
        {c: 'LA', pts: 1, max: 1},
        {c: 'MA', pts: 2, max: 2},
        {c: 'PS', pts: 0, max: 1}, // failed
        {c: 'VR', pts: 1, max: 2},
      ];

      window.showResults();

      expect(document.getElementById('s-results').classList.contains('on')).toBe(true);
      expect(document.getElementById('rlb').textContent).toBe("Alice's IQ Result");

      jest.runAllTimers();

      expect(Number(document.getElementById('rsco').textContent)).toBeGreaterThan(60);
      expect(document.getElementById('rcls').textContent).not.toBe('—');
      expect(document.getElementById('rpct').textContent).not.toBe('—');

      const grid = document.getElementById('dom-grid');
      expect(grid.children.length).toBe(7); // 7 domains

      const popRows = document.getElementById('pop-rows');
      expect(popRows.children.length).toBe(7);

      const refTable = document.getElementById('rref');
      expect(refTable.children.length).toBe(8); // 8 references
      expect(refTable.querySelectorAll('.hl').length).toBe(1); // 1 highlighted
    });

    it('should show default title if name is You', () => {
      window.S.name = 'You';
      window.S.answers = [];

      window.showResults();
      expect(document.getElementById('rlb').textContent).toBe("Your IQ Result");
    });
  });
});
