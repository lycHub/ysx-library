import"./modulepreload-polyfill.b7f2da20.js";import"./index.c7835f9b.js";import{s as l,r as s}from"./tool.19296855.js";import{H as n,t as a,x as m}from"./xml.7ceb4a85.js";import{P as u}from"./mobile-picker.es.0a103c63.js";var v=`<!doctype html>\r
<html lang="en">\r
\r
<head>\r
  <meta charset="UTF-8" />\r
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />\r
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\r
  <title>\u9ED8\u8BA4\u548C\u4FEE\u6539\u503C</title>\r
</head>\r
\r
<body>\r
  <div class="page demo simple">\r
    <mdui-card class="demo-card" variant="outlined">\r
      <div class="demo-card-top">\r
        <form id="form">\r
          <fieldset>\r
            <legend>\u9ED8\u8BA4\u548C\u4FEE\u6539\u503C:</legend>\r
            <p>\u9ED8\u8BA4\u9009\u4E2D\u7684index: [3]</p>\r
            <label for="value">\u66F4\u6539\u503C</label>\r
            <input type="number" id="value" name="value" value="3" />\r
            <button>\u63D0\u4EA4</button>\r
          </fieldset>\r
        </form>\r
\r
\r
        <div class="value">selectedIndexes: <span></span></div>\r
      </div>\r
      <!-- picker start \u6839\u5143\u7D20 -->\r
      <div class="demo-card-mid mobile-picker">\r
        <!-- picker view \u5BB9\u5668 -->\r
        <div class="mobile-picker-view-container">\r
\r
          <!-- \u5355\u5217picker view -->\r
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
</html>`,p=`@import "@ysx-libs/mobile-picker/style.css";\r
\r
.mobile-picker {\r
  --picker-container-height: 380px;\r
  --overlay-color: rgba(var(--mdui-color-surface-container), 0.4), rgba(var(--mdui-color-surface-container), 0.8);\r
  --picker-overlay-border-color: rgb(var(--mdui-color-surface-variant));\r
}`,b=`import { Picker, PickerDefScrollShape } from '@ysx-libs/mobile-picker';\r
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
`;let e=[3];function g(){const r=new u(".mobile-picker",{selectedIndexes:e,onChange(t){e=t,o()},mouseWheel:!0}),i=document.getElementById("form");i&&i.addEventListener("submit",t=>{t.preventDefault();const c=i.querySelector('input[name="value"]');if(c){const d=Number(c.value);Number.isNaN(d)||(e[0]=d,o(),r.setIndexes(e))}}),o()}function o(){const r=document.querySelector(".demo-card-top .value span");r&&(r.textContent=e.join("\uFF0C"))}n.registerLanguage("typescript",a);n.registerLanguage("html",m);n.registerLanguage("scss",l);customElements.whenDefined("mdui-card").then(()=>{g(),s({html:v,css:p,ts:b}),n.highlightAll()});
