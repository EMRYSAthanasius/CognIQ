const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('index.html', 'utf-8');
const dom = new JSDOM(html, { runScripts: "dangerously" });
const window = dom.window;
const document = window.document;
window.scrollTo = () => {};

// Setup state for showResults
window.S = {
  name: "You",
  age: 25,
  qs: [],
  idx: 60,
  answers: Array(60).fill({c:"LA", p:2, ok:true, t:10, pts:2, max:2}),
  chosen: 0,
  tid: null,
  elapsed: 10
};

function runBenchmark(iterations) {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    window.showResults();
  }
  const end = performance.now();
  return end - start;
}

// Warm up
runBenchmark(100);

// Run benchmark
const iterations = 5000;
const time = runBenchmark(iterations);
console.log(`Baseline showResults: ${time.toFixed(2)}ms for ${iterations} iterations`);
