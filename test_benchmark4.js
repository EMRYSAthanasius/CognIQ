const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const dom = new JSDOM('<html><body></body></html>');
const window = dom.window;
const document = window.document;

const grid = document.createElement('div');
grid.id = 'dom-grid';
document.body.appendChild(grid);

function methodBaseline() {
  grid.innerHTML = '';
  for(let i=0; i<7; i++){
    let card = document.createElement('div');
    card.innerHTML = `<div class="a"><div class="b"></div></div><span class="c"></span><div class="dom-track"><div class="dom-fill" data-w="50"></div></div>`;
    grid.appendChild(card);
  }
  let df = grid.querySelectorAll('.dom-fill');
  for(let fi=0;fi<df.length;fi++) df[fi].style.width = df[fi].getAttribute('data-w')+'%';
}

function methodDomTraversal() {
  grid.innerHTML = '';
  let dfList = [];
  for(let i=0; i<7; i++){
    let card = document.createElement('div');
    card.innerHTML = `<div class="a"><div class="b"></div></div><span class="c"></span><div class="dom-track"><div class="dom-fill" data-w="50"></div></div>`;
    grid.appendChild(card);
    dfList.push(card.lastElementChild.firstElementChild); // .dom-track > .dom-fill
  }
  for(let fi=0;fi<dfList.length;fi++) dfList[fi].style.width = dfList[fi].getAttribute('data-w')+'%';
}

function bench(name, fn, iterations) {
  let start = performance.now();
  for(let i=0; i<iterations; i++) fn();
  console.log(`${name}: ${(performance.now() - start).toFixed(2)}ms`);
}

bench('Baseline', methodBaseline, 10000);
bench('DomTraversal', methodDomTraversal, 10000);
