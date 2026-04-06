const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('index.html', 'utf-8');
const dom = new JSDOM(html, { runScripts: "dangerously" });
const window = dom.window;
const document = window.document;
window.scrollTo = () => {};

// Populate S.answers
window.S.answers = [
  {c:"LA",p:1,ok:true,t:10,pts:1,max:1},
  {c:"MA",p:1,ok:true,t:10,pts:1,max:1},
  {c:"PS",p:1,ok:true,t:10,pts:1,max:1},
  {c:"VR",p:1,ok:true,t:10,pts:1,max:1},
  {c:"WM",p:1,ok:true,t:10,pts:1,max:1},
  {c:"SP",p:1,ok:true,t:10,pts:1,max:1},
  {c:"SR",p:1,ok:true,t:10,pts:1,max:1}
];

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
const iterations = 1000;
const time = runBenchmark(iterations);
console.log(`Baseline: ${time.toFixed(2)}ms for ${iterations} iterations`);
