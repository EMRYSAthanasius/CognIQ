const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('index.html', 'utf-8');
const dom = new JSDOM(html, { runScripts: "dangerously" });
const window = dom.window;
const document = window.document;
window.scrollTo = () => {};

const ids = ['s-home', 's-setup', 's-test', 's-results'];

function runBenchmark(iterations) {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    const id = ids[i % ids.length];
    window.gS(id);
  }
  const end = performance.now();
  return end - start;
}

// Warm up
runBenchmark(100);

// Run benchmark
const iterations = 10000;
const time = runBenchmark(iterations);
console.log(`Baseline: ${time.toFixed(2)}ms for ${iterations} iterations`);
