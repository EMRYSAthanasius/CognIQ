const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const dom = new JSDOM('<html><body></body></html>');
const window = dom.window;
const document = window.document;

const grid = document.createElement('div');
grid.id = 'dom-grid';
document.body.appendChild(grid);

const pop = document.createElement('div');
pop.id = 'pop-rows';
document.body.appendChild(pop);

function methodBaseline() {
  grid.innerHTML = '';
  pop.innerHTML = '';
  for(let i=0; i<7; i++){
    let card = document.createElement('div');
    card.innerHTML = `<div class="a"><div class="b"></div></div><span class="c"></span><div class="dom-track"><div class="dom-fill" data-w="50"></div></div>`;
    grid.appendChild(card);
  }
  let df = grid.querySelectorAll('.dom-fill');
  for(let fi=0;fi<df.length;fi++) df[fi].style.width = df[fi].getAttribute('data-w')+'%';

  for(let i=0; i<7; i++){
    let row = document.createElement('div');
    row.innerHTML = `<div class="a"></div><div class="pop-bars"><div class="pop-avg-bar" data-w="50"></div><div class="pop-you-bar" data-w="50"></div></div>`;
    pop.appendChild(row);
  }
  let ab = pop.querySelectorAll('.pop-avg-bar');
  let yb = pop.querySelectorAll('.pop-you-bar');
  for(let bi=0;bi<ab.length;bi++) ab[bi].style.width = ab[bi].getAttribute('data-w')+'%';
  for(let bi=0;bi<yb.length;bi++) yb[bi].style.width = yb[bi].getAttribute('data-w')+'%';
}

function methodQuerySelector() {
  grid.innerHTML = '';
  pop.innerHTML = '';
  let dfList = [];
  for(let i=0; i<7; i++){
    let card = document.createElement('div');
    card.innerHTML = `<div class="a"><div class="b"></div></div><span class="c"></span><div class="dom-track"><div class="dom-fill" data-w="50"></div></div>`;
    grid.appendChild(card);
    dfList.push(card.querySelector('.dom-fill'));
  }
  for(let fi=0;fi<dfList.length;fi++) dfList[fi].style.width = dfList[fi].getAttribute('data-w')+'%';

  let abList = [];
  let ybList = [];
  for(let i=0; i<7; i++){
    let row = document.createElement('div');
    row.innerHTML = `<div class="a"></div><div class="pop-bars"><div class="pop-avg-bar" data-w="50"></div><div class="pop-you-bar" data-w="50"></div></div>`;
    pop.appendChild(row);
    abList.push(row.querySelector('.pop-avg-bar'));
    ybList.push(row.querySelector('.pop-you-bar'));
  }
  for(let bi=0;bi<abList.length;bi++) abList[bi].style.width = abList[bi].getAttribute('data-w')+'%';
  for(let bi=0;bi<ybList.length;bi++) ybList[bi].style.width = ybList[bi].getAttribute('data-w')+'%';
}

function methodCreateElement() {
  grid.innerHTML = '';
  pop.innerHTML = '';
  let dfList = [];
  for(let i=0; i<7; i++){
    let card = document.createElement('div');
    let track = document.createElement('div');
    let fill = document.createElement('div');
    fill.setAttribute('data-w', '50');
    track.appendChild(fill);
    card.appendChild(track);
    grid.appendChild(card);
    dfList.push(fill);
  }
  for(let fi=0;fi<dfList.length;fi++) dfList[fi].style.width = dfList[fi].getAttribute('data-w')+'%';

  let abList = [];
  let ybList = [];
  for(let i=0; i<7; i++){
    let row = document.createElement('div');
    let bars = document.createElement('div');
    let avg = document.createElement('div');
    avg.setAttribute('data-w', '50');
    let you = document.createElement('div');
    you.setAttribute('data-w', '50');
    bars.appendChild(avg);
    bars.appendChild(you);
    row.appendChild(bars);
    pop.appendChild(row);
    abList.push(avg);
    ybList.push(you);
  }
  for(let bi=0;bi<abList.length;bi++) abList[bi].style.width = abList[bi].getAttribute('data-w')+'%';
  for(let bi=0;bi<ybList.length;bi++) ybList[bi].style.width = ybList[bi].getAttribute('data-w')+'%';
}

function bench(name, fn, iterations) {
  let start = performance.now();
  for(let i=0; i<iterations; i++) fn();
  console.log(`${name}: ${(performance.now() - start).toFixed(2)}ms`);
}

bench('Baseline', methodBaseline, 10000);
bench('QuerySelector', methodQuerySelector, 10000);
bench('CreateElement', methodCreateElement, 10000);
