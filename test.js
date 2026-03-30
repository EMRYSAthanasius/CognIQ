const fs = require('fs');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync('index.html', 'utf-8');
const dom = new JSDOM(html, { runScripts: "dangerously" });
const window = dom.window;
const document = window.document;
window.scrollTo = () => {};

// Initial state
let activeCount = document.querySelectorAll('.scr.on').length;
if (activeCount !== 1) throw new Error("Expected exactly one active screen initially");

// Switch to setup
window.gS('s-setup');
if (!document.getElementById('s-setup').classList.contains('on')) throw new Error("s-setup not active");
if (document.getElementById('s-home').classList.contains('on')) throw new Error("s-home still active");

// Switch to test
window.gS('s-test');
if (!document.getElementById('s-test').classList.contains('on')) throw new Error("s-test not active");
if (document.getElementById('pw').style.display !== 'block') throw new Error("pw display not block for s-test");

// Switch to results
window.gS('s-results');
if (!document.getElementById('s-results').classList.contains('on')) throw new Error("s-results not active");
if (document.getElementById('pw').style.display === 'block') throw new Error("pw display block for s-results");
if (document.getElementById('hdr-r').innerHTML !== 'Assessment Complete') throw new Error("hdr-r text incorrect for s-results");

// Test calcIQ function
const calcIQ = window.calcIQ;
if (typeof calcIQ !== 'function') throw new Error("calcIQ function not found");

// Edge case: mx is 0 or falsy
if (calcIQ(50, 0, 30) !== 100) throw new Error("calcIQ(!mx) should return 100");

// Age adjustments (using 50/100 score which normally gives p=0.5)
if (calcIQ(50, 100, 10) !== 106) throw new Error("calcIQ age < 14 failed");
if (calcIQ(50, 100, 16) !== 104) throw new Error("calcIQ age < 18 failed");
if (calcIQ(50, 100, 20) !== 102) throw new Error("calcIQ age < 22 failed");
if (calcIQ(50, 100, 25) !== 101) throw new Error("calcIQ age < 28 failed");
if (calcIQ(50, 100, 35) !== 100) throw new Error("calcIQ age < 40 failed");
if (calcIQ(50, 100, 45) !== 102) throw new Error("calcIQ age < 50 failed");
if (calcIQ(50, 100, 55) !== 103) throw new Error("calcIQ age < 60 failed");
if (calcIQ(50, 100, 65) !== 105) throw new Error("calcIQ age < 70 failed");
if (calcIQ(50, 100, 75) !== 107) throw new Error("calcIQ age >= 70 failed");

// Max cap (high probability)
if (calcIQ(100, 100, 30) !== 162) throw new Error("calcIQ max cap failed");

// Min cap (low probability)
if (calcIQ(0, 100, 30) !== 60) throw new Error("calcIQ min cap failed");

console.log('All tests passed!');
