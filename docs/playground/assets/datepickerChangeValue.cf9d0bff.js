import"./modulepreload-polyfill.b7f2da20.js";import"./index.b6ea835a.js";import"./index.d071f6ce.js";import"./tabs.6bc04e7b.js";import{H as f,t as h,x as w}from"./xml.7ceb4a85.js";import{s as D}from"./scss.38479186.js";import{v as S,c as V,d as M,e as H,h as T,i as P,j as C,u as L,a as O,f as E,g as q,D as N,t as $,b as F}from"./date.38f454db.js";import{P as j}from"./mobile-picker.es.c0391f59.js";var A=`<!doctype html>\r
<html lang="en">\r
\r
<head>\r
  <meta charset="UTF-8" />\r
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />\r
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\r
  <title>Date picker(\u6539\u53D8\u503C)</title>\r
</head>\r
\r
<body>\r
  <div class="page demo simple">\r
    <mdui-card class="demo-card" variant="outlined">\r
      <div class="demo-card-top">\r
        <form id="form">\r
          <mdui-text-field  type="datetime-local" id="value" label="\u6539\u53D8\u503C"></mdui-text-field>\r
          <mdui-button  type="submit">\u6539\u53D8\u503C</mdui-button>\r
        </form>\r
       \r
        <p class="value">selectedDate: <span></span></p>\r
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
        <mdui-tab value="types">types</mdui-tab>\r
        <mdui-tab value="utils">utils</mdui-tab>\r
        <mdui-tab value="ts">ts</mdui-tab>\r
        <mdui-tab value="html">html</mdui-tab>\r
        <mdui-tab value="css">css</mdui-tab>\r
      \r
    \r
        <mdui-tab-panel class="demo-code-content" slot="panel" value="types">\r
          <pre><code class="language-ts"></code></pre>\r
        </mdui-tab-panel>\r
        <mdui-tab-panel class="demo-code-content" slot="panel" value="utils">\r
          <pre><code class="language-ts"></code></pre>\r
        </mdui-tab-panel>\r
        <mdui-tab-panel class="demo-code-content" slot="panel" value="ts">\r
          <pre><code class="language-ts"></code></pre>\r
        </mdui-tab-panel>\r
        <mdui-tab-panel class="demo-code-content" slot="panel" value="html">\r
          <pre><code class="language-html"></code></pre>\r
        </mdui-tab-panel>\r
        <mdui-tab-panel class="demo-code-content" slot="panel" value="css">\r
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
</html>`,Y=`@import "@ysx-libs/mobile-picker/style.css";\r
\r
.mobile-picker {\r
  --picker-container-height: 380px;\r
  --overlay-color: rgba(var(--mdui-color-surface-container), 0.4), rgba(var(--mdui-color-surface-container), 0.8);\r
  --picker-overlay-border-color: rgb(var(--mdui-color-surface-variant));\r
}`,B=`import { Picker, } from "@ysx-libs/mobile-picker";\r
import { DefaultMode, genOptions, updateDay, validModeList, valueToDate } from "../../../utils/date";\r
import { ColumnType, DatePickerOptions, FormattedValue, GenFullRes } from "../../../types/date-picker";\r
import { format, getDate, getHours, getMinutes, getMonth, getSeconds, getYear } from "date-fns";\r
\r
let defaultProps: DatePickerOptions = {\r
  value: null,\r
  mode: DefaultMode\r
};\r
\r
let allData: GenFullRes = {};\r
const validMode = validModeList(defaultProps.mode);\r
let formattedValue: FormattedValue[] = [];\r
let pickerIndexes: number[] = [];\r
\r
export function run() {\r
  const data = initData(defaultProps);\r
  allData = data.allData;\r
  formattedValue = data.formattedValue;\r
  // console.log('formattedValue>>>', allData, formattedValue);\r
  const pickerOptions = validMode.map((item) => allData[item]!.data);\r
  pickerIndexes = valueToPickerIndexes();\r
\r
  renderPickerViews(pickerOptions);\r
  renderLabel();\r
\r
  const pickerInstance = new Picker('.mobile-picker', {\r
    selectedIndexes: pickerIndexes,\r
    onChange(indexes, trigger, colIndex) {\r
      // console.log('onChange>>>', trigger);\r
      if (['wheel', 'drag', 'click'].includes(trigger)) {\r
        onChange.call(pickerInstance, indexes, colIndex);\r
      }\r
    },\r
  });\r
\r
  const formNode = document.getElementById('form');\r
  if (formNode) {\r
    formNode.addEventListener('submit', (event) => {\r
      event.preventDefault();\r
      const input = formNode.querySelector('mdui-text-field[type="datetime-local"]') as HTMLInputElement;\r
      if (input) {\r
        setValue(new Date(input.value));\r
        pickerIndexes = valueToPickerIndexes();\r
        renderLabel();\r
        // console.log('setValue>>>', formattedValue);\r
        pickerInstance.setIndexes(pickerIndexes);\r
      }\r
    });\r
  }\r
}\r
\r
\r
function setValue(value: Date) {\r
  formattedValue.forEach(item => {\r
    switch (item.type) {\r
      case 'y':\r
        const y = getYear(value).toString();\r
        item.value = y;\r
        item.pickerIndex = allData.y!.data.findIndex((item) => item === y);\r
        break;\r
      case 'M':\r
        const M = (getMonth(value) + 1).toString();\r
        item.value = M;\r
        item.pickerIndex = allData.M!.data.findIndex((item) => item === M);\r
        break;\r
      case 'd':\r
        const d = getDate(value).toString();\r
        item.value = d;\r
        item.pickerIndex = allData.d!.data.findIndex((item) => item === d);\r
        break;\r
      case 'H':\r
        const H = getHours(value).toString();\r
        item.value = H;\r
        item.pickerIndex = allData.H!.data.findIndex((item) => item === H);\r
        break;\r
      case 'm':\r
        const m = getMinutes(value).toString();\r
        item.value = m;\r
        item.pickerIndex = allData.m!.data.findIndex((item) => item === m);\r
        break;\r
      case 's':\r
        const s = getSeconds(value).toString();\r
        item.value = s;\r
        item.pickerIndex = allData.s!.data.findIndex((item) => item === s);\r
        break;\r
    }\r
  });\r
}\r
\r
\r
function onChange(this: Picker, indexes: number[], colIndex: number) {\r
\r
  const type = validMode[colIndex];\r
  const valueTarget = formattedValue.find((item) => item.type === type);\r
  if (!valueTarget) {\r
    return;\r
  }\r
  valueTarget.value = allData[type]!.data[indexes[colIndex]];\r
  valueTarget.pickerIndex = indexes[colIndex];\r
\r
  if (type === 'M') {\r
    const { newValue, newIndex, newOptions, valueChanged } = updateDay(\r
      formattedValue,\r
      defaultProps.filter?.d,\r
    );\r
\r
    allData.d!.data = newOptions;\r
    const pickerOptions = validMode.map((item) => allData[item]!.data);\r
    const dayIndex = validMode.indexOf('d');\r
    renderPickerView(pickerOptions, dayIndex);\r
\r
    if (valueChanged) {\r
      const dayTarget = formattedValue.find((item) => item.type === 'd')!;\r
      dayTarget.value = newValue.toString();\r
      dayTarget.pickerIndex = newIndex!;\r
    }\r
\r
    pickerIndexes = valueToPickerIndexes();\r
\r
    this.refreshColumns([dayIndex], pickerIndexes);\r
    // this.refreshAll(pickerIndexes);\r
  }\r
\r
\r
  pickerIndexes = valueToPickerIndexes();\r
  // console.log('result>>>', pickerIndexes, formattedValue);\r
  renderLabel();\r
}\r
\r
function valueToPickerIndexes() {\r
  return validMode.map((mItem) => {\r
    const target = formattedValue.find(\r
      (item) => item.type === mItem,\r
    );\r
    return target?.pickerIndex || 0;\r
  });\r
}\r
\r
function renderLabel() {\r
  const selectedDate = valueToDate(formattedValue);\r
  const valueNode = document.querySelector('.demo-card-top .value span');\r
  if (valueNode) {\r
    valueNode.textContent = format(selectedDate, 'yyyy/MM/dd HH:mm');\r
  }\r
}\r
\r
\r
\r
\r
function initData(props: DatePickerOptions) {\r
  const allData = genOptions(\r
    props.value,\r
    props.filter,\r
  );\r
  return {\r
    allData,\r
    formattedValue: Object.entries(allData).map(\r
      ([key, { selected, data }], index) => ({\r
        index,\r
        type: key as ColumnType,\r
        value: selected,\r
        pickerIndex: Math.max(data.findIndex((item) => item === selected), 0),\r
      }),\r
    )\r
  }\r
}\r
\r
\r
function renderPickerViews(options: string[][]) {\r
  const pickerViewContainer = document.querySelector(\r
    '.mobile-picker .mobile-picker-view-container'\r
  );\r
  if (pickerViewContainer) {\r
    let pickerViewStr = '';\r
    options.forEach((colItem) => {\r
      const itemStr = getListHtmlStr(colItem);\r
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
\r
function renderPickerView(data: string[][], index: number) {\r
  const pickerView = document.querySelector(\r
    \`.mobile-picker .mobile-picker-view-container .mobile-picker-view:nth-child(\${index + 1}) .mobile-picker-view-item-container\`\r
  );\r
  if (pickerView) {\r
    let pickerViewStr = '';\r
    const itemStr = getListHtmlStr(data[index]);\r
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
}`;let g={value:null,mode:N},o={};const m=S(g.mode);let s=[],c=[];function G(){const r=U(g);o=r.allData,s=r.formattedValue;const e=m.map(i=>o[i].data);c=v(),z(e),k();const t=new j(".mobile-picker",{selectedIndexes:c,onChange(i,n,l){["wheel","drag","click"].includes(n)&&J.call(t,i,l)}}),a=document.getElementById("form");a&&a.addEventListener("submit",i=>{i.preventDefault();const n=a.querySelector('mdui-text-field[type="datetime-local"]');n&&(R(new Date(n.value)),c=v(),k(),t.setIndexes(c))})}function R(r){s.forEach(e=>{switch(e.type){case"y":const t=C(r).toString();e.value=t,e.pickerIndex=o.y.data.findIndex(d=>d===t);break;case"M":const a=(P(r)+1).toString();e.value=a,e.pickerIndex=o.M.data.findIndex(d=>d===a);break;case"d":const i=T(r).toString();e.value=i,e.pickerIndex=o.d.data.findIndex(d=>d===i);break;case"H":const n=H(r).toString();e.value=n,e.pickerIndex=o.H.data.findIndex(d=>d===n);break;case"m":const l=M(r).toString();e.value=l,e.pickerIndex=o.m.data.findIndex(d=>d===l);break;case"s":const u=V(r).toString();e.value=u,e.pickerIndex=o.s.data.findIndex(d=>d===u);break}})}function J(r,e){var i;const t=m[e],a=s.find(n=>n.type===t);if(!!a){if(a.value=o[t].data[r[e]],a.pickerIndex=r[e],t==="M"){const{newValue:n,newIndex:l,newOptions:u,valueChanged:d}=L(s,(i=g.filter)==null?void 0:i.d);o.d.data=u;const y=m.map(p=>o[p].data),b=m.indexOf("d");if(K(y,b),d){const p=s.find(I=>I.type==="d");p.value=n.toString(),p.pickerIndex=l}c=v(),this.refreshColumns([b],c)}c=v(),k()}}function v(){return m.map(r=>{const e=s.find(t=>t.type===r);return(e==null?void 0:e.pickerIndex)||0})}function k(){const r=O(s),e=document.querySelector(".demo-card-top .value span");e&&(e.textContent=E(r,"yyyy/MM/dd HH:mm"))}function U(r){const e=q(r.value,r.filter);return{allData:e,formattedValue:Object.entries(e).map(([t,{selected:a,data:i}],n)=>({index:n,type:t,value:a,pickerIndex:Math.max(i.findIndex(l=>l===a),0)}))}}function z(r){const e=document.querySelector(".mobile-picker .mobile-picker-view-container");if(e){let t="";r.forEach(a=>{t+=`<div class="mobile-picker-view">
          <div class="mobile-picker-view-item-container">
            ${x(a)}
          </div>
        </div>`}),e.innerHTML=t}}function K(r,e){const t=document.querySelector(`.mobile-picker .mobile-picker-view-container .mobile-picker-view:nth-child(${e+1}) .mobile-picker-view-item-container`);if(t){let a="";a+=x(r[e]),t.innerHTML=a}}function x(r){let e="";return r.forEach(t=>{e+=`<div class="mobile-picker-view-item">${t}</div>`}),e}f.registerLanguage("typescript",h);f.registerLanguage("html",w);f.registerLanguage("scss",D);const Q={html:A,css:Y,ts:B,types:$,utils:F};function W(){document.querySelectorAll(".demo-code-content").forEach(e=>{e.querySelector("pre code").textContent=Q[e.value]})}customElements.whenDefined("mdui-card").then(()=>{G(),W(),f.highlightAll()});
