const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('index.html', 'utf-8');
const dom = new JSDOM(html, { runScripts: "dangerously" });
const window = dom.window;
const document = window.document;
window.scrollTo = () => {};

const start = performance.now();
const iterations = 1000;
for (let i = 0; i < iterations; i++) {
  var iq = 115;
  var REFS=[
    {r:"145+",l:"Genius",p:"<0.2%",lo:145,hi:999},
    {r:"130-144",l:"Gifted",p:"2.1%",lo:130,hi:144},
    {r:"120-129",l:"Superior Intelligence",p:"6.7%",lo:120,hi:129},
    {r:"110-119",l:"High Average",p:"16.1%",lo:110,hi:119},
    {r:"90-109",l:"Average",p:"50.0%",lo:90,hi:109},
    {r:"80-89",l:"Low Average",p:"13.6%",lo:80,hi:89},
    {r:"70-79",l:"Borderline",p:"6.7%",lo:70,hi:79},
    {r:"Below 70",l:"Below Average",p:"<2.0%",lo:0,hi:69}
  ];
  var tbl=document.getElementById('rref');
  var htmlStr = '';
  for(var ri=0;ri<REFS.length;ri++){
    var rv=REFS[ri],act=(iq>=rv.lo&&iq<=rv.hi);
    htmlStr += '<tr' + (act ? ' class="hl"' : '') + '><td>'+rv.r+'</td><td>'+rv.l+'</td><td>'+rv.p+'</td></tr>';
  }
  tbl.innerHTML = htmlStr;
}
const end = performance.now();
console.log(`Table Build Optimized: ${(end - start).toFixed(2)}ms for ${iterations} iterations`);
