import"./modulepreload-polyfill.b7f2da20.js";import"./index.6d647bf0.js";import"./index.c7835f9b.js";import{s as b,r as g}from"./tool.19296855.js";import{H as i,t as k,x as f}from"./xml.7ceb4a85.js";import{g as u,u as h}from"./util.f3dd45bd.js";import{P as y}from"./mobile-picker.es.0a103c63.js";var w=`<!doctype html>\r
<html lang="en">\r
\r
<head>\r
  <meta charset="UTF-8" />\r
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />\r
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\r
  <title>\u5237\u65B0\u5217\u8868</title>\r
</head>\r
\r
<body>\r
  <div class="page demo simple">\r
    <mdui-card class="demo-card" variant="outlined">\r
      <div class="demo-card-top">\r
        <mdui-button id="refresh">\u5237\u65B0\u5217\u8868</mdui-button>\r
        <mdui-button id="refresh-selected">\u5237\u65B0\u5217\u8868\u5E76\u9009\u4E2D\u7B2C4\u9879</mdui-button>\r
        <p class="value">selectedIndexes: <span></span></p>\r
      </div>\r
      <!-- picker start \u6839\u5143\u7D20 -->\r
      <div class="demo-card-mid mobile-picker">\r
        <!-- picker view \u5BB9\u5668 -->\r
        <div class="mobile-picker-view-container">\r
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
          <mdui-tab-panel class="demo-code-content" slot="panel" value="util">\r
            <mdui-tooltip trigger="click" content="copied">\r
              <mdui-icon-content-copy class="demo-code-copy"></mdui-icon-content-copy>\r
            </mdui-tooltip>\r
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
</html>`,S=`@import "@ysx-libs/mobile-picker/style.css";\r
\r
.mobile-picker {\r
  --picker-container-height: 380px;\r
  --overlay-color: rgba(var(--mdui-color-surface-container), 0.4), rgba(var(--mdui-color-surface-container), 0.8);\r
  --picker-overlay-border-color: rgb(var(--mdui-color-surface-variant));\r
}`,L=`import { Picker } from '@ysx-libs/mobile-picker';\r
import { genItems } from '../../../../util';\r
\r
\r
let data = [genItems(16)];\r
let value: number[] = [];\r
\r
export function run() {\r
  renderPickerViews();\r
  renderLabel();\r
  const pickerInstance = new Picker('.mobile-picker', {\r
    selectedIndexes: value,\r
    onChange(event) {\r
      console.log('onChange>>>', event);\r
      value = event;\r
      renderLabel();\r
    },\r
  });\r
\r
  const refreshBtn = document.getElementById('refresh');\r
  if (refreshBtn) {\r
    refreshBtn.addEventListener('click', () => {\r
      refreshList();\r
    });\r
  }\r
\r
  const refreshAndSelectBtn = document.getElementById('refresh-selected');\r
  if (refreshAndSelectBtn) {\r
    refreshAndSelectBtn.addEventListener('click', () => {\r
      refreshList([3]);\r
    });\r
  }\r
\r
  function refreshList(event?: number[]) {\r
    data[0] = genItems(5);\r
    renderPickerViews();\r
    value = pickerInstance.refreshAll(event);\r
    renderLabel();\r
  }\r
\r
  function renderLabel() {\r
    const valueNode = document.querySelector('.demo-card-top .value span');\r
    if (valueNode) {\r
      const label = value.map((event, index) => data[index][event]);\r
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
      data.forEach((listItem) => {\r
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
  function getListHtmlStr(list: string[]) {\r
    let str = '';\r
    list.forEach((item) => {\r
      str += \`<div class="mobile-picker-view-item">\${item}</div>\`;\r
    });\r
    return str;\r
  }\r
}\r
\r
\r
\r
\r
\r
\r
`;let o=[u(16)],t=[];function x(){d(),c();const p=new y(".mobile-picker",{selectedIndexes:t,onChange(e){console.log("onChange>>>",e),t=e,c()}}),s=document.getElementById("refresh");s&&s.addEventListener("click",()=>{a()});const l=document.getElementById("refresh-selected");l&&l.addEventListener("click",()=>{a([3])});function a(e){o[0]=u(5),d(),t=p.refreshAll(e),c()}function c(){const e=document.querySelector(".demo-card-top .value span");if(e){const r=t.map((n,m)=>o[m][n]);e.textContent=r.join("\uFF0C")}}function d(){const e=document.querySelector(".mobile-picker .mobile-picker-view-container");if(e){let r="";o.forEach(n=>{r+=`<div class="mobile-picker-view">
            <div class="mobile-picker-view-item-container">
              ${v(n)}
            </div>
          </div>`}),e.innerHTML=r}}function v(e){let r="";return e.forEach(n=>{r+=`<div class="mobile-picker-view-item">${n}</div>`}),r}}i.registerLanguage("typescript",k);i.registerLanguage("html",f);i.registerLanguage("scss",b);customElements.whenDefined("mdui-card").then(()=>{x(),g({html:w,css:S,ts:L,util:h}),i.highlightAll()});
