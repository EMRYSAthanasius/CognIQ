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

    describe('pick', () => {
      beforeEach(() => {
        // Initialize basic state for pick
        window.S.qs = [
          { c: 'LA', p: 2, a: 1, fast: false, o: ['A', 'B', 'C', 'D'], q: 'Test Q' }
        ];
        window.S.idx = 0;
        window.S.chosen = null;
        window.S.answers = [];
        window.S.elapsed = 15;
        window.S.tid = 123; // Dummy timer ID
        window.clearInterval = jest.fn();

        // Setup DOM for lockOpts and bnext
        document.getElementById('qcw').innerHTML = '<div class="opts"><button class="opt"></button><button class="opt"></button><button class="opt"></button><button class="opt"></button></div>';
        document.getElementById('bnext').classList.remove('vis');
      });

      it('should record a correct answer properly', () => {
        window.pick(1);

        expect(window.S.chosen).toBe(1);
        expect(window.clearInterval).toHaveBeenCalledWith(123);
        expect(window.S.answers).toHaveLength(1);
        expect(window.S.answers[0]).toEqual({
          c: 'LA',
          p: 2,
          ok: true,
          t: 15,
          pts: 2,
          max: 2
        });

        // Verify button became visible
        expect(document.getElementById('bnext').classList.contains('vis')).toBe(true);

        // Verify lockOpts was called implicitly by checking DOM class
        const opts = document.querySelectorAll('.opt');
        expect(opts[1].classList.contains('ch')).toBe(true);
        expect(opts[0].style.pointerEvents).toBe('none');
      });

      it('should record an incorrect answer properly', () => {
        window.pick(2);

        expect(window.S.chosen).toBe(2);
        expect(window.S.answers).toHaveLength(1);
        expect(window.S.answers[0]).toEqual({
          c: 'LA',
          p: 2,
          ok: false,
          t: 15,
          pts: 0, // 0 points for incorrect
          max: 2
        });
      });

      it('should do nothing if an answer is already chosen', () => {
        window.S.chosen = 0; // Already answered

        window.pick(1);

        expect(window.S.chosen).toBe(0); // Should not change
        expect(window.clearInterval).not.toHaveBeenCalled();
        expect(window.S.answers).toHaveLength(0); // No new answer recorded
      });

      it('should cap time recorded based on question type (fast=20, normal=60)', () => {
        // Normal question over 60 seconds
        window.S.elapsed = 75;
        window.pick(1);
        expect(window.S.answers[0].t).toBe(60);

        // Reset for fast question
        window.S.chosen = null;
        window.S.answers = [];
        window.S.idx = 1;
        window.S.qs.push({ c: 'SP', p: 1, a: 0, fast: true, o: ['A', 'B'], q: 'Speed Q' });
        window.S.elapsed = 25; // Over the 20s limit for fast

        window.pick(0);
        expect(window.S.answers[0].t).toBe(20);
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
