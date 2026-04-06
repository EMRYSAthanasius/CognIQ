const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('index.html', 'utf-8');
const dom = new JSDOM(html, { runScripts: "dangerously" });
const window = dom.window;
const document = window.document;
window.scrollTo = () => {};

// Setup mock state to run showResults
window.S = {
  name: 'Test',
  age: 25,
  answers: [
    { c: 'LA', pts: 1, max: 1 },
    { c: 'MA', pts: 0, max: 1 }
  ]
};

const start = performance.now();
const iterations = 1000;
for (let i = 0; i < iterations; i++) {
  window.showResults();
}
const end = performance.now();
console.log(`showResults Baseline: ${(end - start).toFixed(2)}ms for ${iterations} iterations`);
