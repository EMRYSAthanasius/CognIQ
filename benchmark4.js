const { JSDOM } = require("jsdom");
const fs = require("fs");
const html = fs.readFileSync("index.html", "utf-8");

function runBenchmark(type) {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const CATS = ['LA','MA','PS','VR','WM','SP','SR'];
  const catPcts = {LA: 80, MA: 70, PS: 90, VR: 85, WM: 75, SP: 65, SR: 95};
  const POP_AVG = {LA: 50, MA: 50, PS: 50, VR: 50, WM: 50, SP: 50, SR: 50};
  const CC = {
    LA: {bg: '#f00', full: 'Logical & Abstract'},
    MA: {bg: '#0f0', full: 'Mathematical'},
    PS: {bg: '#00f', full: 'Problem-Solving'},
    VR: {bg: '#ff0', full: 'Verbal Reasoning'},
    WM: {bg: '#0ff', full: 'Working Memory'},
    SP: {bg: '#f0f', full: 'Processing Speed'},
    SR: {bg: '#fff', full: 'Spatial Reasoning'}
  };

  const start = process.hrtime.bigint();

  for (let iter = 0; iter < 10000; iter++) {
    var pop=document.getElementById('pop-rows');
    if (!pop) {
      pop = document.createElement('div');
      pop.id = 'pop-rows';
      document.body.appendChild(pop);
    }
    pop.innerHTML='';

    if (type === 'opt_array') {
      var ab = [];
      var yb = [];
      for(var pi=0;pi<CATS.length;pi++){
        var pcat=CATS[pi],pyou=catPcts[pcat],pavg=POP_AVG[pcat],pcfg=CC[pcat];
        var beat=Math.min(99,Math.max(1,Math.round(50+(pyou-pavg)*0.7)));
        var row=document.createElement('div');row.className='pop-row';
        row.innerHTML=
          '<div class="pop-head">'
            +'<div class="pop-name sans"><span class="pdot" style="background:'+pcfg.bg+'"></span>'+pcfg.full+'</div>'
            +'<div class="pop-you sans" style="color:'+pcfg.bg+'">You: '+pyou+'%  &nbsp;&bull;&nbsp;  Beat '+beat+'% of test-takers</div>'
          +'</div>'
          +'<div class="pop-bars">'
            +'<div class="pop-avg-bar" data-w="'+pavg+'"></div>'
            +'<div class="pop-you-bar" data-w="'+pyou+'" style="background:'+pcfg.bg+'"></div>'
          +'</div>';
        pop.appendChild(row);
        var bars = row.lastElementChild;
        ab.push(bars.firstElementChild);
        yb.push(bars.lastElementChild);
      }
      for(var bi=0;bi<ab.length;bi++) ab[bi].style.width=ab[bi].getAttribute('data-w')+'%';
      for(var bi2=0;bi2<yb.length;bi2++) yb[bi2].style.width=yb[bi2].getAttribute('data-w')+'%';
    } else {
      for(var pi=0;pi<CATS.length;pi++){
        var pcat=CATS[pi],pyou=catPcts[pcat],pavg=POP_AVG[pcat],pcfg=CC[pcat];
        var beat=Math.min(99,Math.max(1,Math.round(50+(pyou-pavg)*0.7)));
        var row=document.createElement('div');row.className='pop-row';
        row.innerHTML=
          '<div class="pop-head">'
            +'<div class="pop-name sans"><span class="pdot" style="background:'+pcfg.bg+'"></span>'+pcfg.full+'</div>'
            +'<div class="pop-you sans" style="color:'+pcfg.bg+'">You: '+pyou+'%  &nbsp;&bull;&nbsp;  Beat '+beat+'% of test-takers</div>'
          +'</div>'
          +'<div class="pop-bars">'
            +'<div class="pop-avg-bar" data-w="'+pavg+'"></div>'
            +'<div class="pop-you-bar" data-w="'+pyou+'" style="background:'+pcfg.bg+'"></div>'
          +'</div>';
        pop.appendChild(row);
      }
      var ab=pop.querySelectorAll('.pop-avg-bar');
      var yb=pop.querySelectorAll('.pop-you-bar');
      for(var bi=0;bi<ab.length;bi++) ab[bi].style.width=ab[bi].getAttribute('data-w')+'%';
      for(var bi2=0;bi2<yb.length;bi2++) yb[bi2].style.width=yb[bi2].getAttribute('data-w')+'%';
    }
  }

  const end = process.hrtime.bigint();
  return Number(end - start) / 1e6;
}

const b1 = runBenchmark('baseline');
const o1 = runBenchmark('opt_array');
const b2 = runBenchmark('baseline');
const o2 = runBenchmark('opt_array');
const b3 = runBenchmark('baseline');
const o3 = runBenchmark('opt_array');

const baseline = (b1 + b2 + b3) / 3;
const opt_array = (o1 + o2 + o3) / 3;

console.log(`Baseline avg: ${baseline.toFixed(2)} ms`);
console.log(`Optimized avg: ${opt_array.toFixed(2)} ms`);
console.log(`Improvement: ${(((baseline - opt_array) / baseline) * 100).toFixed(2)}%`);
