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
  // We want to test only the rref table update logic
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
  var tbl=document.getElementById('rref');tbl.innerHTML='';
  for(var ri=0;ri<REFS.length;ri++){
    var rv=REFS[ri],act=(iq>=rv.lo&&iq<=rv.hi);
    var tr2=document.createElement('tr');if(act)tr2.className='hl';
    tr2.innerHTML='<td>'+rv.r+'</td><td>'+rv.l+'</td><td>'+rv.p+'</td>';
    tbl.appendChild(tr2);
  }
}
const end = performance.now();
console.log(`Table Build Baseline: ${(end - start).toFixed(2)}ms for ${iterations} iterations`);
