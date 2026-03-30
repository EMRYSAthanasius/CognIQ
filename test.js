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

// Test shuf
const shuf = window.shuf;
const origArray = [1, 2, 3, 4, 5];
const origArrayCopy = [...origArray];
const shuffledArray = shuf(origArray);

if (origArray.length !== origArrayCopy.length || !origArray.every((val, index) => val === origArrayCopy[index])) {
    throw new Error("shuf mutated the original array");
}

if (shuffledArray.length !== origArray.length) {
    throw new Error("shuffled array length does not match original");
}

const sortedOrig = [...origArray].sort();
const sortedShuffled = [...shuffledArray].sort();
if (JSON.stringify(sortedOrig) !== JSON.stringify(sortedShuffled)) {
    throw new Error("shuffled array contains different elements");
}

// Edge cases
const emptyArray = [];
if (shuf(emptyArray).length !== 0) throw new Error("shuf on empty array failed");
if (shuf([1]).length !== 1 || shuf([1])[0] !== 1) throw new Error("shuf on single element failed");

console.log('All tests passed!');
