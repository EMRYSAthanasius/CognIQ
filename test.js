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

// Test pct(iq) function
if (window.pct(100) !== 50) throw new Error("pct(100) should be 50");
if (window.pct(130) !== 97) throw new Error("pct(130) should be 97");
if (window.pct(70) !== 3) throw new Error("pct(70) should be 3");
if (window.pct(10) !== 1) throw new Error("pct(10) should be 1 (minimum clamped)");
if (window.pct(200) !== 99) throw new Error("pct(200) should be 99 (maximum clamped)");

console.log('All tests passed!');
