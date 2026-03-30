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

// Test doSetup missing/invalid age validation
const iage = document.getElementById('iage');
const testCases = [
    { value: '', desc: 'empty age' },
    { value: '9', desc: 'age too low' },
    { value: '81', desc: 'age too high' }
];

testCases.forEach(tc => {
    iage.value = tc.value;
    iage.style.borderColor = ''; // reset
    iage.placeholder = ''; // reset
    window.doSetup();

    // Check validation effects
    if (iage.style.borderColor !== 'rgb(184, 50, 50)' && iage.style.borderColor !== '#B83232') {
        throw new Error(`Validation failed for ${tc.desc}: incorrect borderColor ${iage.style.borderColor}`);
    }
    if (iage.placeholder !== 'Enter age 10 to 80') {
        throw new Error(`Validation failed for ${tc.desc}: incorrect placeholder ${iage.placeholder}`);
    }
    // Verify it didn't transition
    if (document.getElementById('s-test').classList.contains('on')) {
        throw new Error(`Validation failed for ${tc.desc}: should not have transitioned to s-test`);
    }
});

// Test doSetup happy path
iage.value = '25';
window.doSetup();
if (!document.getElementById('s-test').classList.contains('on')) throw new Error("s-test not active after valid doSetup");
if (document.getElementById('pw').style.display !== 'block') throw new Error("pw display not block for s-test");

// Switch to results
window.gS('s-results');
if (!document.getElementById('s-results').classList.contains('on')) throw new Error("s-results not active");
if (document.getElementById('pw').style.display === 'block') throw new Error("pw display block for s-results");
if (document.getElementById('hdr-r').innerHTML !== 'Assessment Complete') throw new Error("hdr-r text incorrect for s-results");

console.log('All tests passed!');
