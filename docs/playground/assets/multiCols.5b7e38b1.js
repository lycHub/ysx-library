import"./modulepreload-polyfill.b7f2da20.js";import"./index.c7835f9b.js";import{s as t,r as c}from"./tool.19296855.js";import{H as i,t as o,x as d}from"./xml.7ceb4a85.js";import{P as s}from"./mobile-picker.es.0a103c63.js";var l=`<!doctype html>\r
<html lang="en">\r
\r
<head>\r
  <meta charset="UTF-8" />\r
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />\r
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\r
  <title>\u591A\u5217picker</title>\r
</head>\r
\r
<body>\r
  <div class="page demo simple">\r
    <mdui-card class="demo-card" variant="outlined">\r
      <div class="demo-card-top">\r
        <p class="value">selectedIndexes: <span></span></p>\r
      </div>\r
      <!-- picker start \u6839\u5143\u7D20 -->\r
      <div class="demo-card-mid mobile-picker">\r
        <!-- picker view \u5BB9\u5668 -->\r
        <div class="mobile-picker-view-container">\r
\r
          <!-- \u7B2C\u4E00\u5217 -->\r
          <div class="mobile-picker-view">\r
            <div class="mobile-picker-view-item-container">\r
              <div class="mobile-picker-view-item">item0</div>\r
              <div class="mobile-picker-view-item">item1</div>\r
              <div class="mobile-picker-view-item">item2</div>\r
              <div class="mobile-picker-view-item">item3</div>\r
              <div class="mobile-picker-view-item">item4</div>\r
              <div class="mobile-picker-view-item">item5</div>\r
              <div class="mobile-picker-view-item">item6</div>\r
              <div class="mobile-picker-view-item">item7</div>\r
              <div class="mobile-picker-view-item">item8</div>\r
            </div>\r
          </div>\r
\r
          <!-- \u7B2C\u4E8C\u5217 -->\r
          <div class="mobile-picker-view">\r
            <div class="mobile-picker-view-item-container">\r
              <div class="mobile-picker-view-item">item1-0</div>\r
              <div class="mobile-picker-view-item">item1-1</div>\r
              <div class="mobile-picker-view-item">item1-2</div>\r
              <div class="mobile-picker-view-item">item1-3</div>\r
              <div class="mobile-picker-view-item">item1-4</div>\r
            </div>\r
          </div>\r
\r
          <!-- \u7B2C\u4E09\u5217 -->\r
          <div class="mobile-picker-view">\r
            <div class="mobile-picker-view-item-container">\r
              <div class="mobile-picker-view-item">item2-0</div>\r
              <div class="mobile-picker-view-item">item2-1</div>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- \u8499\u5C42 -->\r
        <div class="mobile-picker-overlay">\r
          <div class="mobile-picker-overlay-mid"></div>\r
        </div>\r
      </div>\r
      <!-- picker end -->\r
\r
      <div class="demo-card-bottom">\r
        <mdui-tabs class="dcb-tabs" value="ts">\r
          <mdui-tab value="ts">ts</mdui-tab>\r
          <mdui-tab value="html">html</mdui-tab>\r
          <mdui-tab value="css">css</mdui-tab>\r
\r
\r
          <mdui-tab-panel class="demo-code-content" slot="panel" value="ts">\r
            <mdui-tooltip trigger="click" content="copied">\r
              <mdui-icon-content-copy class="demo-code-copy"></mdui-icon-content-copy>\r
            </mdui-tooltip>\r
            <pre><code class="language-ts"></code></pre>\r
          </mdui-tab-panel>\r
          <mdui-tab-panel class="demo-code-content" slot="panel" value="html">\r
            <mdui-tooltip trigger="click" content="copied">\r
              <mdui-icon-content-copy class="demo-code-copy"></mdui-icon-content-copy>\r
            </mdui-tooltip>\r
            <pre><code class="language-html"></code></pre>\r
          </mdui-tab-panel>\r
          <mdui-tab-panel class="demo-code-content" slot="panel" value="css">\r
            <mdui-tooltip trigger="click" content="copied">\r
              <mdui-icon-content-copy class="demo-code-copy"></mdui-icon-content-copy>\r
            </mdui-tooltip>\r
            <pre><code class="language-scss"></code></pre>\r
          </mdui-tab-panel>\r
        </mdui-tabs>\r
      </div>\r
    </mdui-card>\r
  </div>\r
\r
  <script type="module" src="./index.ts"><\/script>\r
</body>\r
\r
</html>`,a=`@import "@ysx-libs/mobile-picker/style.css";\r
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
`;let r=[];function v(){new s(".mobile-picker",{selectedIndexes:r,onChange(e){console.log("onChange>>>",e),r=e,n()}}),n()}function n(){const e=document.querySelector(".demo-card-top .value span");e&&(e.textContent=r.join("\uFF0C"))}i.registerLanguage("typescript",o);i.registerLanguage("html",d);i.registerLanguage("scss",t);customElements.whenDefined("mdui-card").then(()=>{v(),c({html:l,css:a,ts:m}),i.highlightAll()});
