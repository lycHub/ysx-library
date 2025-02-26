import"./modulepreload-polyfill.b7f2da20.js";import"./index.c7835f9b.js";import{s as l,r as o}from"./tool.19296855.js";import{H as r,t as s,x as d}from"./xml.7ceb4a85.js";import{P as m}from"./mobile-picker.es.0a103c63.js";var p=`<!doctype html>\r
<html lang="en">\r
\r
<head>\r
  <meta charset="UTF-8" />\r
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />\r
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\r
  <title>\u6EDA\u52A8\u6837\u5F0F</title>\r
</head>\r
\r
<body>\r
  <div class="page demo simple">\r
    <mdui-card class="demo-card" variant="outlined">\r
      <div class="demo-card-top">\r
        <fieldset>\r
          <legend>Select a shape:</legend>\r
\r
          <input type="radio" id="scale" name="shape" value="scale" checked />\r
          <label for="scale">scale</label>\r
\r
          <input type="radio" id="flat" name="shape" value="flat" />\r
          <label for="flat">flat</label>\r
\r
          <input type="radio" id="rotate" name="shape" value="rotate" />\r
          <label for="rotate">rotate</label>\r
        </fieldset>\r
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
`;let i=[];function b(){const e=new m(".mobile-picker",{selectedIndexes:i,onChange(n){i=n,t()},mouseWheel:!0,scrollShape:"scale"});document.getElementsByName("shape").forEach(n=>{n.addEventListener("change",a=>{const c=a.target;e.innerOptions.scrollShape=c.value,e.refreshAll()})}),t()}function t(){const e=document.querySelector(".demo-card-top .value span");e&&(e.textContent=i.join("\uFF0C"))}r.registerLanguage("typescript",s);r.registerLanguage("html",d);r.registerLanguage("scss",l);customElements.whenDefined("mdui-card").then(()=>{b(),o({html:p,css:v,ts:u}),r.highlightAll()});
