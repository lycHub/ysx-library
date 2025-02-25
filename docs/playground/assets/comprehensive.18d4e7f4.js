import"./modulepreload-polyfill.b7f2da20.js";import"./index.d071f6ce.js";import"./tabs.6bc04e7b.js";import{H as a,t as k,x as g}from"./xml.7ceb4a85.js";import{s as f}from"./scss.38479186.js";import{g as i,u as h}from"./util.f3dd45bd.js";import{P as w}from"./mobile-picker.es.7450b70e.js";var S=`<!doctype html>\r
<html lang="en">\r
\r
<head>\r
  <meta charset="UTF-8" />\r
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />\r
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\r
  <title>\u7EFC\u5408\u793A\u4F8B</title>\r
</head>\r
\r
<body>\r
  <div class="page demo simple">\r
    <mdui-card class="demo-card" variant="outlined">\r
      <div class="demo-card-top">\r
        <div>\r
          <mdui-button id="refresh-all">\u5237\u65B0\u6240\u6709\u5217\u8868</mdui-button>\r
          <mdui-button id="refresh-two">\u5237\u65B0\u7B2C\u4E8C\u5217</mdui-button>\r
          <mdui-button id="refresh-two-select">\u5237\u65B0\u7B2C\u4E8C\u5217\u5E76\u9009\u4E2D\u7B2C4\u9879</mdui-button>\r
        </div>\r
        <div class="value">\u9009\u4E2D\u7684\u9879: <span></span></div>\r
       </div>\r
        <!-- picker start \u6839\u5143\u7D20 -->\r
      <div class="demo-card-mid mobile-picker">\r
        <!-- picker view \u5BB9\u5668 -->\r
       <div class="mobile-picker-view-container">\r
  \r
          <!-- <div class="mobile-picker-view">\r
          <div class="mobile-picker-view-item-container">\r
            <div class="mobile-picker-view-item">item1</div>\r
          </div>\r
        </div> -->\r
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
        <mdui-tab value="util">util</mdui-tab>\r
      \r
    \r
        <mdui-tab-panel class="demo-code-content" slot="panel" value="ts">\r
          <pre><code class="language-ts"></code></pre>\r
        </mdui-tab-panel>\r
        <mdui-tab-panel class="demo-code-content" slot="panel" value="html">\r
          <pre><code class="language-html"></code></pre>\r
        </mdui-tab-panel>\r
        <mdui-tab-panel class="demo-code-content" slot="panel" value="css">\r
          <pre><code class="language-scss"></code></pre>\r
        </mdui-tab-panel>\r
        <mdui-tab-panel class="demo-code-content" slot="panel" value="util">\r
          <pre><code class="language-ts"></code></pre>\r
        </mdui-tab-panel>\r
      </mdui-tabs>\r
      </div>\r
    </mdui-card>\r
  </div>\r
  \r
  <script type="module" src="./index.ts"><\/script>\r
</body>\r
\r
</html>`,y=`@import "@ysx-libs/mobile-picker/style.css";\r
\r
.mobile-picker {\r
  --picker-container-height: 380px;\r
  --overlay-color: rgba(var(--mdui-color-surface-container), 0.4), rgba(var(--mdui-color-surface-container), 0.8);\r
  --picker-overlay-border-color: rgb(var(--mdui-color-surface-variant));\r
}`,I=`import { Picker } from '@ysx-libs/mobile-picker';\r
import { genItems } from '../../../../util';\r
\r
let columns = [genItems(16), genItems(7), genItems(2)];\r
console.log('columns>>>', columns);\r
let value: number[] = [];\r
\r
export function run() {\r
  renderPickerViews();\r
  renderLabel();\r
  const pickerInstance = new Picker('.mobile-picker', {\r
    selectedIndexes: value,\r
    onChange(event, trigger) {\r
      // console.log('onChange>>>', event, trigger);\r
      value = event;\r
      renderLabel();\r
    },\r
    mouseWheel: true,\r
    clickToSelect: true,\r
  });\r
\r
  const refreshAllBtn = document.getElementById('refresh-all');\r
  if (refreshAllBtn) {\r
    refreshAllBtn.addEventListener('click', () => {\r
      columns = [genItems(9), genItems(7), genItems(11)];\r
      renderPickerViews();\r
      value = pickerInstance.refreshAll();\r
      // console.log('value>>>', value);\r
      renderLabel();\r
    });\r
  }\r
\r
  const refreshTwoBtn = document.getElementById('refresh-two');\r
  if (refreshTwoBtn) {\r
    refreshTwoBtn.addEventListener('click', () => {\r
      columns[1] = genItems(7);\r
      renderPickerView(1);\r
      value = pickerInstance.refreshColumns([1]);\r
      // console.log('value>>>', value);\r
      renderLabel();\r
    });\r
  }\r
\r
  const refreshTwoAndSelectBtn = document.getElementById('refresh-two-select');\r
  if (refreshTwoAndSelectBtn) {\r
    refreshTwoAndSelectBtn.addEventListener('click', () => {\r
      columns[1] = genItems(7);\r
      value[1] = 3;\r
      renderPickerView(1);\r
      value = pickerInstance.refreshColumns([1], value);\r
      // console.log('value >>>', value);\r
      renderLabel();\r
    });\r
  }\r
\r
  function renderLabel() {\r
    const valueNode = document.querySelector('.demo-card-top .value span');\r
    if (valueNode) {\r
      const label = value.map((event, index) => columns[index][event]);\r
      valueNode.textContent = label.join('\uFF0C');\r
    }\r
  }\r
\r
  function renderPickerViews() {\r
    const pickerViewContainer = document.querySelector(\r
      '.mobile-picker .mobile-picker-view-container'\r
    );\r
    if (pickerViewContainer) {\r
      let pickerViewStr = '';\r
      columns.forEach((listItem) => {\r
        const itemStr = getListHtmlStr(listItem);\r
        pickerViewStr += \`<div class="mobile-picker-view">\r
            <div class="mobile-picker-view-item-container">\r
              \${itemStr}\r
            </div>\r
          </div>\`;\r
      });\r
      pickerViewContainer.innerHTML = pickerViewStr;\r
    }\r
  }\r
\r
  function renderPickerView(index: number) {\r
    const pickerView = document.querySelector(\r
      \`.mobile-picker .mobile-picker-view-container .mobile-picker-view:nth-child(\${\r
        index + 1\r
      }) .mobile-picker-view-item-container\`\r
    );\r
    if (pickerView) {\r
      let pickerViewStr = '';\r
      const itemStr = getListHtmlStr(columns[index]);\r
      pickerViewStr += itemStr;\r
      pickerView.innerHTML = pickerViewStr;\r
    }\r
  }\r
\r
  function getListHtmlStr(list: string[]) {\r
    let str = '';\r
    list.forEach((item) => {\r
      str += \`<div class="mobile-picker-view-item">\${item}</div>\`;\r
    });\r
    return str;\r
  }\r
}\r
`;let c=[i(16),i(7),i(2)];console.log("columns>>>",c);let t=[];function L(){v(),o();const s=new w(".mobile-picker",{selectedIndexes:t,onChange(e,r){t=e,o()},mouseWheel:!0,clickToSelect:!0}),l=document.getElementById("refresh-all");l&&l.addEventListener("click",()=>{c=[i(9),i(7),i(11)],v(),t=s.refreshAll(),o()});const m=document.getElementById("refresh-two");m&&m.addEventListener("click",()=>{c[1]=i(7),p(1),t=s.refreshColumns([1]),o()});const u=document.getElementById("refresh-two-select");u&&u.addEventListener("click",()=>{c[1]=i(7),t[1]=3,p(1),t=s.refreshColumns([1],t),o()});function o(){const e=document.querySelector(".demo-card-top .value span");if(e){const r=t.map((n,d)=>c[d][n]);e.textContent=r.join("\uFF0C")}}function v(){const e=document.querySelector(".mobile-picker .mobile-picker-view-container");if(e){let r="";c.forEach(n=>{r+=`<div class="mobile-picker-view">
            <div class="mobile-picker-view-item-container">
              ${b(n)}
            </div>
          </div>`}),e.innerHTML=r}}function p(e){const r=document.querySelector(`.mobile-picker .mobile-picker-view-container .mobile-picker-view:nth-child(${e+1}) .mobile-picker-view-item-container`);if(r){let n="";n+=b(c[e]),r.innerHTML=n}}function b(e){let r="";return e.forEach(n=>{r+=`<div class="mobile-picker-view-item">${n}</div>`}),r}}a.registerLanguage("typescript",k);a.registerLanguage("html",g);a.registerLanguage("scss",f);const V={util:h,html:S,css:y,ts:I};function x(){document.querySelectorAll(".demo-code-content").forEach(l=>{l.querySelector("pre code").textContent=V[l.value]})}customElements.whenDefined("mdui-card").then(()=>{L(),x(),a.highlightAll()});
