import"./modulepreload-polyfill.b7f2da20.js";import"./tabs.e162c8ee.js";import{H as n,t as c,x as o}from"./xml.7ceb4a85.js";import{s as d}from"./scss.38479186.js";import{P as m}from"./mobile-picker.es.7bcb7d3c.js";var p=`<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>\u9F20\u6807\u6EDA\u8F6E</title>
</head>

<body>
  <div class="page demo simple">
    <mdui-card class="demo-card" variant="outlined">
      <div class="demo-card-top">
        <fieldset>
          <legend>Select a shape:</legend>
        
          <input type="radio" id="scale" name="shape" value="scale" checked />
          <label for="scale">scale</label>
        
          <input type="radio" id="flat" name="shape" value="flat" />
            <label for="flat">flat</label>
        
            <input type="radio" id="rotate" name="shape" value="rotate" />
            <label for="rotate">rotate</label>
        </fieldset>
        
        <div class="value">selectedIndexes: <span></span></div>
       </div>
        <!-- picker start \u6839\u5143\u7D20 -->
      <div class="demo-card-mid mobile-picker">
        <!-- picker view \u5BB9\u5668 -->
       <div class="mobile-picker-view-container">
  
         <!-- \u5355\u5217picker view -->
         <div class="mobile-picker-view">
           <div class="mobile-picker-view-item-container">
             <div class="mobile-picker-view-item">item0</div>
             <div class="mobile-picker-view-item">item1</div>
             <div class="mobile-picker-view-item">item2</div>
             <div class="mobile-picker-view-item">item3</div>
             <div class="mobile-picker-view-item">item4</div>
             <div class="mobile-picker-view-item">item5</div>
             <div class="mobile-picker-view-item">item6</div>
             <div class="mobile-picker-view-item">item7</div>
             <div class="mobile-picker-view-item">item8</div>
           </div>
         </div>
       </div>
  
       <!-- \u8499\u5C42 -->
       <div class="mobile-picker-overlay">
         <div class="mobile-picker-overlay-mid"></div>
       </div>
     </div>
      <!-- picker end -->
  
     <div class="demo-card-bottom">
      <mdui-tabs class="dcb-tabs" value="js">
        <mdui-tab value="js">js</mdui-tab>
        <mdui-tab value="html">html</mdui-tab>
        <mdui-tab value="css">css</mdui-tab>
      
    
        <mdui-tab-panel class="demo-code-content" slot="panel" value="js">
          <pre><code class="language-ts"></code></pre>
        </mdui-tab-panel>
        <mdui-tab-panel class="demo-code-content" slot="panel" value="html">
          <pre><code class="language-html"></code></pre>
        </mdui-tab-panel>
        <mdui-tab-panel class="demo-code-content" slot="panel" value="css">
          <pre><code class="language-scss"></code></pre>
        </mdui-tab-panel>
      </mdui-tabs>
      </div>
    </mdui-card>
  </div>
  
  <script type="module" src="./index.ts"><\/script>
</body>

</html>`,v=`@import "@ysx-libs/mobile-picker/style.css";\r
\r
.mobile-picker {\r
  --picker-container-height: 380px;\r
  --overlay-color: rgba(var(--mdui-color-surface-container), 0.4), rgba(var(--mdui-color-surface-container), 0.8);\r
  --picker-overlay-border-color: rgb(var(--mdui-color-surface-variant));\r
}`,u=`import { Picker, PickerDefScrollShape } from '@ysx-libs/mobile-picker';\r
\r
\r
let selectedIndexes: number[] = [];\r
\r
export function run() {\r
  const pickerInstance = new Picker('.mobile-picker', {\r
    selectedIndexes,\r
    onChange(event) {\r
      selectedIndexes = event;\r
      renderLabel();\r
    },\r
    mouseWheel: true,\r
    scrollShape: 'scale' // \u9ED8\u8BA4\r
  });\r
\r
\r
  const shapesRadio = document.getElementsByName('shape');\r
  shapesRadio.forEach((item) => {\r
    item.addEventListener('change', (event) => {\r
      const target = event.target as HTMLInputElement;\r
      pickerInstance.innerOptions.scrollShape = target.value as PickerDefScrollShape;\r
      pickerInstance.refreshAll();\r
    })\r
  });\r
  renderLabel();\r
}\r
\r
\r
\r
function renderLabel() {\r
  const valueNode = document.querySelector('.demo-card-top .value span');\r
  if (valueNode) {\r
    valueNode.textContent = selectedIndexes.join('\uFF0C');\r
  }\r
}\r
\r
\r
\r
\r
`;let r=[];function b(){const e=new m(".mobile-picker",{selectedIndexes:r,onChange(t){r=t,a()},mouseWheel:!0,scrollShape:"scale"});document.getElementsByName("shape").forEach(t=>{t.addEventListener("change",s=>{const l=s.target;e.innerOptions.scrollShape=l.value,e.refreshAll()})}),a()}function a(){const e=document.querySelector(".demo-card-top .value span");e&&(e.textContent=r.join("\uFF0C"))}n.registerLanguage("typescript",c);n.registerLanguage("html",o);n.registerLanguage("scss",d);const h={html:p,css:v,js:u};function g(){document.querySelectorAll(".demo-code-content").forEach(i=>{i.querySelector("pre code").textContent=h[i.value]})}customElements.whenDefined("mdui-card").then(()=>{b(),g(),n.highlightAll()});
