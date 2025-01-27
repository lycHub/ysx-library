import"./modulepreload-polyfill.b7f2da20.js";import"./tabs.e162c8ee.js";import{H as i,t as c,x as s}from"./xml.7ceb4a85.js";import{s as l}from"./scss.38479186.js";import{P as a}from"./mobile-picker.es.7bcb7d3c.js";var d=`<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>\u591A\u5217picker</title>
</head>

<body>
  <div class="page demo simple">
    <mdui-card class="demo-card" variant="outlined">
      <div class="demo-card-top">
        <p class="value">selectedIndexes: <span></span></p>
       </div>
        <!-- picker start \u6839\u5143\u7D20 -->
      <div class="demo-card-mid mobile-picker">
        <!-- picker view \u5BB9\u5668 -->
       <div class="mobile-picker-view-container">
  
         <!-- \u7B2C\u4E00\u5217 -->
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

        <!-- \u7B2C\u4E8C\u5217 -->
        <div class="mobile-picker-view">
          <div class="mobile-picker-view-item-container">
            <div class="mobile-picker-view-item">item1-0</div>
            <div class="mobile-picker-view-item">item1-1</div>
            <div class="mobile-picker-view-item">item1-2</div>
            <div class="mobile-picker-view-item">item1-3</div>
            <div class="mobile-picker-view-item">item1-4</div>
          </div>
        </div>

        <!-- \u7B2C\u4E09\u5217 -->
        <div class="mobile-picker-view">
          <div class="mobile-picker-view-item-container">
            <div class="mobile-picker-view-item">item2-0</div>
            <div class="mobile-picker-view-item">item2-1</div>
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

</html>`,o=`@import "@ysx-libs/mobile-picker/style.css";\r
\r
.mobile-picker {\r
  --picker-container-height: 380px;\r
  --overlay-color: rgba(var(--mdui-color-surface-container), 0.4), rgba(var(--mdui-color-surface-container), 0.8);\r
  --picker-overlay-border-color: rgb(var(--mdui-color-surface-variant));\r
}`,m=`import { Picker } from "@ysx-libs/mobile-picker";\r
\r
\r
let selectedIndexes: number[] = [];\r
\r
export function run() {\r
  const pickerInstance = new Picker('.mobile-picker', {\r
    selectedIndexes,\r
    onChange(event) {\r
      console.log('onChange>>>', event);\r
      selectedIndexes = event;\r
      renderLabel();\r
    },\r
  });\r
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
\r
`;let n=[];function v(){new a(".mobile-picker",{selectedIndexes:n,onChange(e){console.log("onChange>>>",e),n=e,r()}}),r()}function r(){const e=document.querySelector(".demo-card-top .value span");e&&(e.textContent=n.join("\uFF0C"))}i.registerLanguage("typescript",c);i.registerLanguage("html",s);i.registerLanguage("scss",l);const p={html:d,css:o,js:m};function u(){document.querySelectorAll(".demo-code-content").forEach(t=>{t.querySelector("pre code").textContent=p[t.value]})}customElements.whenDefined("mdui-card").then(()=>{v(),u(),i.highlightAll()});
