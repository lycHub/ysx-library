import"./modulepreload-polyfill.b7f2da20.js";import"./tabs.e162c8ee.js";import{H as t,t as c,x as d}from"./xml.7ceb4a85.js";import{s as o}from"./scss.38479186.js";import{P as m}from"./mobile-picker.es.7bcb7d3c.js";var v=`<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>\u9ED8\u8BA4\u548C\u4FEE\u6539\u503C</title>
</head>

<body>
  <div class="page demo simple">
    <mdui-card class="demo-card" variant="outlined">
      <div class="demo-card-top">
        <form id="form">
          <fieldset>
            <legend>\u9ED8\u8BA4\u548C\u4FEE\u6539\u503C:</legend>
            <p>\u9ED8\u8BA4\u9009\u4E2D\u7684index: [3]</p>
            <label for="value">\u66F4\u6539\u503C</label>
              <input type="number" id="value" name="value" value="3" />
            <button>\u63D0\u4EA4</button>
          </fieldset>
        </form>
       
        
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

</html>`,u=`@import "@ysx-libs/mobile-picker/style.css";\r
\r
.mobile-picker {\r
  --picker-container-height: 380px;\r
  --overlay-color: rgba(var(--mdui-color-surface-container), 0.4), rgba(var(--mdui-color-surface-container), 0.8);\r
  --picker-overlay-border-color: rgb(var(--mdui-color-surface-variant));\r
}`,p=`import { Picker, PickerDefScrollShape } from '@ysx-libs/mobile-picker';\r
\r
\r
let selectedIndexes: number[] = [3];\r
export function run() {\r
  const pickerInstance = new Picker('.mobile-picker', {\r
    selectedIndexes,\r
    onChange(event) {\r
      selectedIndexes = event;\r
      renderLabel();\r
    },\r
    mouseWheel: true\r
  });\r
\r
  const formNode = document.getElementById('form');\r
  if (formNode) {\r
    formNode.addEventListener('submit', (event) => {\r
      event.preventDefault();\r
      const input = formNode.querySelector('input[name="value"]') as HTMLInputElement;\r
      if (input) {\r
        const value = Number(input.value);\r
        if (!Number.isNaN(value)) {\r
          selectedIndexes[0] = value;\r
          renderLabel();\r
          pickerInstance.setIndexes(selectedIndexes);\r
        }\r
      }\r
\r
    });\r
  }\r
  renderLabel();\r
}\r
\r
\r
function renderLabel() {\r
  const valueNode = document.querySelector('.demo-card-top .value span');\r
  if (valueNode) {\r
    valueNode.textContent = selectedIndexes.join('\uFF0C');\r
  }\r
}\r
\r
`;let i=[3];function b(){const n=new m(".mobile-picker",{selectedIndexes:i,onChange(r){i=r,a()},mouseWheel:!0}),e=document.getElementById("form");e&&e.addEventListener("submit",r=>{r.preventDefault();const s=e.querySelector('input[name="value"]');if(s){const l=Number(s.value);Number.isNaN(l)||(i[0]=l,a(),n.setIndexes(i))}}),a()}function a(){const n=document.querySelector(".demo-card-top .value span");n&&(n.textContent=i.join("\uFF0C"))}t.registerLanguage("typescript",c);t.registerLanguage("html",d);t.registerLanguage("scss",o);const f={html:v,css:u,js:p};function g(){document.querySelectorAll(".demo-code-content").forEach(e=>{e.querySelector("pre code").textContent=f[e.value]})}customElements.whenDefined("mdui-card").then(()=>{b(),g(),t.highlightAll()});
