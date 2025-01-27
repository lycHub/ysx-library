import"./modulepreload-polyfill.b7f2da20.js";import"./tabs.e162c8ee.js";import{H as v,t as w,x as k}from"./xml.7ceb4a85.js";import{s as g}from"./scss.38479186.js";import{P as S}from"./mobile-picker.es.7bcb7d3c.js";var x=`<!doctype html>\r
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
          <button id="refresh-all">\u5237\u65B0\u6240\u6709\u5217\u8868</button>\r
        <button id="refresh-two">\u5237\u65B0\u7B2C\u4E8C\u5217</button>\r
        <button id="refresh-two-select">\u5237\u65B0\u7B2C\u4E8C\u5217\u5E76\u9009\u4E2D\u7B2C4\u9879</button>\r
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
      <mdui-tabs class="dcb-tabs" value="js">\r
        <mdui-tab value="js">js</mdui-tab>\r
        <mdui-tab value="html">html</mdui-tab>\r
        <mdui-tab value="css">css</mdui-tab>\r
        <mdui-tab value="util">util</mdui-tab>\r
      \r
    \r
        <mdui-tab-panel class="demo-code-content" slot="panel" value="js">\r
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
}`,E=`import { Picker } from '@ysx-libs/mobile-picker';\r
import { genItems } from '../../../../util';\r
\r
let columns = [genItems(16), genItems(7), genItems(2)];\r
let value: number[] = [];\r
\r
export function run() {\r
  renderPickerViews();\r
  renderLabel();\r
  const pickerInstance = new Picker('.mobile-picker', {\r
    selectedIndexes: value,\r
    onChange(event) {\r
      // console.log('onChange>>>', event, trigger);\r
      value = event;\r
      renderLabel();\r
    },\r
    mouseWheel: true,\r
    clickToSelect: true\r
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
    const valueNode = document.querySelector('.demo-top .value span');\r
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
      \`.mobile-picker .mobile-picker-view-container .mobile-picker-view:nth-child(\${index + 1}) .mobile-picker-view-item-container\`\r
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
\r
}\r
\r
`,V=`import cryptoRandomString from 'crypto-random-string';\r
export function genItems(length: number) {\r
  return Array.from({ length }).map((_, index) => {\r
    const id = cryptoRandomString({ length: 8 });\r
    return \`\${id}-\${index + 1}\`;\r
  });\r
}`;const I=[..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~"],L=[..."0123456789"],T=[..."CDEHKMPRTUWXY012458"],C=[..."!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~"],B=[..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"],P=(e,r)=>e[r]+(e[r+1]<<8),A=(e,r,i)=>{const n=r.length,t=Math.floor(65536/n)*n-1,o=2*Math.ceil(1.1*e);let p="",m=0;for(;m<e;){const c=i(o);let l=0;for(;l<o&&m<e;){const s=P(c,l);l+=2,!(s>t)&&(p+=r[s%n],m++)}}return p},H=new Set([void 0,"hex","base64","url-safe","numeric","distinguishable","ascii-printable","alphanumeric"]),M=(e,r,i)=>({length:n,type:t,characters:o})=>{if(!(n>=0&&Number.isFinite(n)))throw new TypeError("Expected a `length` to be a non-negative finite number");if(t!==void 0&&o!==void 0)throw new TypeError("Expected either `type` or `characters`");if(o!==void 0&&typeof o!="string")throw new TypeError("Expected `characters` to be string");if(!H.has(t))throw new TypeError(`Unknown type: ${t}`);if(t===void 0&&o===void 0&&(t="hex"),t==="hex"||t===void 0&&o===void 0)return r(Math.ceil(n*.5),"hex",n);if(t==="base64")return r(Math.ceil(n*.75),"base64",n);if(t==="url-safe")return e(n,I,i);if(t==="numeric")return e(n,L,i);if(t==="distinguishable")return e(n,T,i);if(t==="ascii-printable")return e(n,C,i);if(t==="alphanumeric")return e(n,B,i);if(o.length===0)throw new TypeError("Expected `characters` string length to be greater than or equal to 1");if(o.length>65536)throw new TypeError("Expected `characters` string length to be less or equal to 65536");return e(n,o,i)};function q(e,r){return M(A,e,r)}const j=e=>[...e].map(r=>r.toString(16).padStart(2,"0")).join(""),$=e=>btoa(String.fromCodePoint(...e)),b=65536;function h(e){const r=new Uint8Array(e);for(let i=0;i<e;i+=b)r.set(crypto.getRandomValues(new Uint8Array(Math.min(b,e-i))),i);return r}function R(e,r,i){const n=h(e);return(r==="hex"?j:$)(n).slice(0,i)}var U=q(R,h);function d(e){return Array.from({length:e}).map((r,i)=>`${U({length:8})}-${i+1}`)}let u=[d(16),d(7),d(2)],a=[];function _(){o(),t();const e=new S(".mobile-picker",{selectedIndexes:a,onChange(c){a=c,t()},mouseWheel:!0,clickToSelect:!0}),r=document.getElementById("refresh-all");r&&r.addEventListener("click",()=>{u=[d(9),d(7),d(11)],o(),a=e.refreshAll(),t()});const i=document.getElementById("refresh-two");i&&i.addEventListener("click",()=>{u[1]=d(7),p(1),a=e.refreshColumns([1]),t()});const n=document.getElementById("refresh-two-select");n&&n.addEventListener("click",()=>{u[1]=d(7),a[1]=3,p(1),a=e.refreshColumns([1],a),t()});function t(){const c=document.querySelector(".demo-top .value span");if(c){const l=a.map((s,f)=>u[f][s]);c.textContent=l.join("\uFF0C")}}function o(){const c=document.querySelector(".mobile-picker .mobile-picker-view-container");if(c){let l="";u.forEach(s=>{l+=`<div class="mobile-picker-view">
            <div class="mobile-picker-view-item-container">
              ${m(s)}
            </div>
          </div>`}),c.innerHTML=l}}function p(c){const l=document.querySelector(`.mobile-picker .mobile-picker-view-container .mobile-picker-view:nth-child(${c+1}) .mobile-picker-view-item-container`);if(l){let s="";s+=m(u[c]),l.innerHTML=s}}function m(c){let l="";return c.forEach(s=>{l+=`<div class="mobile-picker-view-item">${s}</div>`}),l}}v.registerLanguage("typescript",w);v.registerLanguage("html",k);v.registerLanguage("scss",g);const N={util:V,html:x,css:y,js:E};function G(){document.querySelectorAll(".demo-code-content").forEach(r=>{r.querySelector("pre code").textContent=N[r.value]})}customElements.whenDefined("mdui-card").then(()=>{_(),G(),v.highlightAll()});
