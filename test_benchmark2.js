const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('index.html', 'utf-8');
const dom = new JSDOM(html, { runScripts: "dangerously" });
const window = dom.window;
const document = window.document;
window.scrollTo = () => {};

// Build a subset of logic to benchmark just the domain bars animation query issue
const grid = document.createElement('div');
grid.id = 'dom-grid';
document.body.appendChild(grid);

function setupGrid() {
  grid.innerHTML = '';
  for (let i = 0; i < 7; i++) {
    const card = document.createElement('div');
    card.innerHTML = `<div class="dom-fill" data-w="50"></div>`;
    grid.appendChild(card);
  }
}

function beforeOptimization() {
  // Simulating the setTimeout callback behavior synchronously for benchmarking
  const df = grid.querySelectorAll('.dom-fill');
  for(let fi=0; fi<df.length; fi++) {
    df[fi].style.width = df[fi].getAttribute('data-w') + '%';
  }
}

function afterOptimization(df_array) {
  for(let fi=0; fi<df_array.length; fi++) {
    df_array[fi].style.width = df_array[fi].getAttribute('data-w') + '%';
  }
}

function runBenchmark() {
  const iterations = 10000;

  // Benchmark before
  let start = performance.now();
  for (let i = 0; i < iterations; i++) {
    setupGrid();
    beforeOptimization();
  }
  let end = performance.now();
  console.log(`Before: ${(end - start).toFixed(2)}ms for ${iterations} iterations`);

  // Benchmark after
  start = performance.now();
  for (let i = 0; i < iterations; i++) {
    setupGrid();

    // Simulating collecting elements while building the grid
    grid.innerHTML = '';
    const df_array = [];
    for (let j = 0; j < 7; j++) {
      const card = document.createElement('div');
      card.innerHTML = `<div class="dom-fill" data-w="50"></div>`;
      grid.appendChild(card);
      // In the actual code, they create HTML string and use innerHTML,
      // so collecting elements during creation would look a bit different.
      // Wait, in index.html, they build an HTML string and set `grid.innerHTML = ...`
      // Wait, let's look at index.html again.
    }
  }
}
runBenchmark();
