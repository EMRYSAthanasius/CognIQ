const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // We can inject a performance test in the page context.
  await page.setContent(`
    <html><body><div id="dom-grid"></div><div id="pop-rows"></div><table id="rref"></table>
    <script>
      var CATS=["LA","MA","PS","VR","WM","SP","SR"];
      var catPcts={LA: 10, MA: 20, PS: 30, VR: 40, WM: 50, SP: 60, SR: 70};
      var CC={
        "LA":{bg:"#1C7070",full:"Logical & Abstract"},
        "MA":{bg:"#2563A8",full:"Mathematical"},
        "PS":{bg:"#C47C20",full:"Problem-Solving"},
        "VR":{bg:"#7B3FA0",full:"Verbal Reasoning"},
        "WM":{bg:"#1A7A4A",full:"Working Memory"},
        "SP":{bg:"#B83232",full:"Processing Speed"},
        "SR":{bg:"#4338CA",full:"Spatial Reasoning"}
      };
      function domLabel(p2){
        if(p2>=90)return{l:"Exceptional",c:"#145858"};
        if(p2>=75)return{l:"Above Average",c:"#1A7A4A"};
        if(p2>=55)return{l:"Average",c:"#2563A8"};
        if(p2>=35)return{l:"Below Average",c:"#C47C20"};
        return{l:"Weak",c:"#B83232"};
      }

      function benchBaseline() {
        var start = performance.now();
        for(let iter=0; iter<1000; iter++) {
          var grid=document.getElementById('dom-grid');grid.innerHTML='';
          for(var di=0;di<CATS.length;di++){
            var dcat=CATS[di],dpct=catPcts[dcat],dlb=domLabel(dpct),dcfg=CC[dcat];
            var card=document.createElement('div');card.className='dom-card';
            card.innerHTML=
              '<div class="dom-card-top">'
                +'<div class="dom-card-name sans"><span class="pdot" style="background:'+dcfg.bg+'"></span>'+dcfg.full+'</div>'
                +'<div class="dom-card-pct" style="color:'+dcfg.bg+'">'+dpct+'%</div>'
              +'</div>'
              +'<span class="dom-label sans" style="background:'+dlb.c+'">'+dlb.l+'</span>'
              +'<div class="dom-track"><div class="dom-fill" data-w="'+dpct+'" style="background:'+dcfg.bg+'"></div></div>';
            grid.appendChild(card);
          }
        }
        return performance.now() - start;
      }

      function benchOptimizedStr() {
        var start = performance.now();
        for(let iter=0; iter<1000; iter++) {
          var grid=document.getElementById('dom-grid');
          var html='';
          for(var di=0;di<CATS.length;di++){
            var dcat=CATS[di],dpct=catPcts[dcat],dlb=domLabel(dpct),dcfg=CC[dcat];
            html+=
              '<div class="dom-card">'
              +'<div class="dom-card-top">'
                +'<div class="dom-card-name sans"><span class="pdot" style="background:'+dcfg.bg+'"></span>'+dcfg.full+'</div>'
                +'<div class="dom-card-pct" style="color:'+dcfg.bg+'">'+dpct+'%</div>'
              +'</div>'
              +'<span class="dom-label sans" style="background:'+dlb.c+'">'+dlb.l+'</span>'
              +'<div class="dom-track"><div class="dom-fill" data-w="'+dpct+'" style="background:'+dcfg.bg+'"></div></div>'
              +'</div>';
          }
          grid.innerHTML=html;
        }
        return performance.now() - start;
      }

      function benchOptimizedFrag() {
        var start = performance.now();
        for(let iter=0; iter<1000; iter++) {
          var grid=document.getElementById('dom-grid');grid.innerHTML='';
          var frag = document.createDocumentFragment();
          for(var di=0;di<CATS.length;di++){
            var dcat=CATS[di],dpct=catPcts[dcat],dlb=domLabel(dpct),dcfg=CC[dcat];
            var card=document.createElement('div');card.className='dom-card';
            card.innerHTML=
              '<div class="dom-card-top">'
                +'<div class="dom-card-name sans"><span class="pdot" style="background:'+dcfg.bg+'"></span>'+dcfg.full+'</div>'
                +'<div class="dom-card-pct" style="color:'+dcfg.bg+'">'+dpct+'%</div>'
              +'</div>'
              +'<span class="dom-label sans" style="background:'+dlb.c+'">'+dlb.l+'</span>'
              +'<div class="dom-track"><div class="dom-fill" data-w="'+dpct+'" style="background:'+dcfg.bg+'"></div></div>';
            frag.appendChild(card);
          }
          grid.appendChild(frag);
        }
        return performance.now() - start;
      }

      window.runBench = function() {
        // warmup
        benchBaseline();
        benchOptimizedStr();
        benchOptimizedFrag();

        return {
          baseline: benchBaseline(),
          str: benchOptimizedStr(),
          frag: benchOptimizedFrag()
        };
      };
    </script>
    </body></html>
  `);

  const results = await page.evaluate(() => window.runBench());
  console.log('Results:', results);

  await browser.close();
})();
