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
    if (window.AppState && window.AppState.get('tid')) {
      clearInterval(window.AppState.get('tid'));
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

    describe('renderQ', () => {
      beforeEach(() => {
        window.S = {
          qs: [
            { c: 'TEST1', p: 1, fast: false, q: 'Standard question?', o: ['A', 'B'] },
            { c: 'TEST2', p: 2, fast: true, memseq: '1-2-3', svgKey: 'testSvg', m: [['1', '2'], ['3', '?']], seq: '1, 2, 3', q: 'Complex question?', o: ['A', 'B', 'C'] },
            { c: 'UNKNOWN', p: 1, fast: false, q: 'Unknown config?', o: ['A'] }
          ],
          idx: 0,
          answers: [],
          chosen: null
        };
        window.CC = {
          'TEST1': { bg: '#111', full: 'Test Category 1' },
          'TEST2': { bg: '#222', full: 'Test Category 2' }
        };
        window.DCOLOR = { 1: '#c1', 2: '#c2' };
        window.DLABEL = { 1: 'Level 1', 2: 'Level 2' };
        window.SVGS = { testSvg: () => '<svg>test</svg>' };
        jest.spyOn(window, 'startTimer').mockImplementation(() => {});
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });

      it('should render a standard question and start timer with 60s', () => {
        window.renderQ();

        expect(document.getElementById('qtag').textContent).toBe('Test Category 1');
        expect(document.querySelector('.qinst').textContent).toBe('Standard question?');
        expect(document.querySelectorAll('.opt').length).toBe(2);
        expect(window.startTimer).toHaveBeenCalledWith(60);
      });

      it('should render a fast/complex question and start timer with 20s', () => {
        window.S.idx = 1;
        window.renderQ();

        const html = document.getElementById('qcw').innerHTML;
        expect(html).toContain('Speed Round');
        expect(html).toContain('memseq');
        expect(html).toContain('svgq');
        expect(html).toContain('mtx');
        expect(html).toContain('qform');
        expect(document.querySelectorAll('.opt').length).toBe(3);
        expect(window.startTimer).toHaveBeenCalledWith(20);
      });

      it('should handle missing category config', () => {
        window.S.idx = 2;
        window.renderQ();

        expect(document.getElementById('qtag').textContent).toBe('UNKNOWN');
        // Depending on the JSDOM parsing, the color might be returned as hex or rgb
        const bg = document.getElementById('qtag').style.background;
        expect(bg === 'rgb(28, 112, 112)' || bg === '#1c7070' || bg === '#1C7070').toBe(true);
      });
    });
  });

  describe('advQ Progression', () => {
    beforeEach(() => {
      window.S.qs = [
        { c: 'LA', p: 1, q: 'Q1', o: ['A', 'B'], a: 0 },
        { c: 'LA', p: 1, q: 'Q2', o: ['C', 'D'], a: 1 }
      ];
      window.S.idx = 0;
      window.S.tid = 12345; // mock timer id

      window.renderQ = jest.fn();
      window.showResults = jest.fn();
      jest.spyOn(window, 'clearInterval');
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should clear interval, increment idx and call renderQ if not at end', () => {
      window.advQ();

      expect(window.clearInterval).toHaveBeenCalledWith(12345);
      expect(window.S.idx).toBe(1);
      expect(window.renderQ).toHaveBeenCalled();
      expect(window.showResults).not.toHaveBeenCalled();
    });

    it('should clear interval, increment idx and call showResults if at end', () => {
      window.S.idx = 1; // currently at the last question
      window.advQ();

      expect(window.clearInterval).toHaveBeenCalledWith(12345);
      expect(window.S.idx).toBe(2);
      expect(window.showResults).toHaveBeenCalled();
      expect(window.renderQ).not.toHaveBeenCalled();
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

      expect(window.AppState.get('name')).toBe('TestUser');
      expect(window.AppState.get('age')).toBe(25);
      expect(window.AppState.get('qs').length).toBeGreaterThan(0);
      expect(window.AppState.get('idx')).toBe(0);
      expect(window.AppState.get('answers')).toEqual([]);
      expect(window.AppState.get('chosen')).toBeNull();

      // It should call gS('s-test') and renderQ()
      expect(document.getElementById('s-test').classList.contains('on')).toBe(true);

      // The question array is shuffled, so we can't reliably predict the exact question category string
      // Just assert it has *some* string value set from the category config map
      expect(document.getElementById('qtag').textContent.length).toBeGreaterThan(0);
      expect(document.getElementById('qtag').textContent).not.toBe('Loading');
    });
  });
});
