const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const dom = new JSDOM('<html><body></body></html>');
const window = dom.window;
const document = window.document;

const pop = document.createElement('div');
pop.id = 'pop-rows';
document.body.appendChild(pop);

function methodBaseline() {
  pop.innerHTML = '';
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

function methodDomTraversal() {
  pop.innerHTML = '';
  let abList = [];
  let ybList = [];
  for(let i=0; i<7; i++){
    let row = document.createElement('div');
    row.innerHTML = `<div class="a"></div><div class="pop-bars"><div class="pop-avg-bar" data-w="50"></div><div class="pop-you-bar" data-w="50"></div></div>`;
    pop.appendChild(row);
    let bars = row.lastElementChild;
    abList.push(bars.firstElementChild);
    ybList.push(bars.lastElementChild);
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
bench('DomTraversal', methodDomTraversal, 10000);
