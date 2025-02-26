import"./modulepreload-polyfill.b7f2da20.js";import"./index.b72dfdd6.js";import"./index.6d647bf0.js";import"./index.c7835f9b.js";import{s as w,r as h}from"./tool.19296855.js";import{H as k,t as D,x as S}from"./xml.7ceb4a85.js";import{v as V,c as M,d as H,e as T,h as P,i as L,j as C,u as O,a as E,f as N,g as q,D as $,t as F,b as j}from"./date.38f454db.js";import{P as Y}from"./mobile-picker.es.0a103c63.js";var A=`<!doctype html>\r
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
          <mdui-text-field type="datetime-local" id="value" label="\u6539\u53D8\u503C"></mdui-text-field>\r
          <mdui-button type="submit">\u6539\u53D8\u503C</mdui-button>\r
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
            <mdui-tooltip trigger="click" content="copied">\r
              <mdui-icon-content-copy class="demo-code-copy"></mdui-icon-content-copy>\r
            </mdui-tooltip>\r
            <pre><code class="language-ts"></code></pre>\r
          </mdui-tab-panel>\r
          <mdui-tab-panel class="demo-code-content" slot="panel" value="utils">\r
            <mdui-tooltip trigger="click" content="copied">\r
              <mdui-icon-content-copy class="demo-code-copy"></mdui-icon-content-copy>\r
            </mdui-tooltip>\r
            <pre><code class="language-ts"></code></pre>\r
          </mdui-tab-panel>\r
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
</html>`,B=`@import "@ysx-libs/mobile-picker/style.css";\r
\r
.mobile-picker {\r
  --picker-container-height: 380px;\r
  --overlay-color: rgba(var(--mdui-color-surface-container), 0.4), rgba(var(--mdui-color-surface-container), 0.8);\r
  --picker-overlay-border-color: rgb(var(--mdui-color-surface-variant));\r
}`,G=`import { Picker, } from "@ysx-libs/mobile-picker";\r
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
}`;let g={value:null,mode:$},d={};const m=V(g.mode);let s=[],l=[];function R(){const r=z(g);d=r.allData,s=r.formattedValue;const e=m.map(n=>d[n].data);l=v(),K(e),f();const t=new Y(".mobile-picker",{selectedIndexes:l,onChange(n,a,c){["wheel","drag","click"].includes(a)&&U.call(t,n,c)}}),i=document.getElementById("form");i&&i.addEventListener("submit",n=>{n.preventDefault();const a=i.querySelector('mdui-text-field[type="datetime-local"]');a&&(J(new Date(a.value)),l=v(),f(),t.setIndexes(l))})}function J(r){s.forEach(e=>{switch(e.type){case"y":const t=C(r).toString();e.value=t,e.pickerIndex=d.y.data.findIndex(o=>o===t);break;case"M":const i=(L(r)+1).toString();e.value=i,e.pickerIndex=d.M.data.findIndex(o=>o===i);break;case"d":const n=P(r).toString();e.value=n,e.pickerIndex=d.d.data.findIndex(o=>o===n);break;case"H":const a=T(r).toString();e.value=a,e.pickerIndex=d.H.data.findIndex(o=>o===a);break;case"m":const c=H(r).toString();e.value=c,e.pickerIndex=d.m.data.findIndex(o=>o===c);break;case"s":const p=M(r).toString();e.value=p,e.pickerIndex=d.s.data.findIndex(o=>o===p);break}})}function U(r,e){var n;const t=m[e],i=s.find(a=>a.type===t);if(!!i){if(i.value=d[t].data[r[e]],i.pickerIndex=r[e],t==="M"){const{newValue:a,newIndex:c,newOptions:p,valueChanged:o}=O(s,(n=g.filter)==null?void 0:n.d);d.d.data=p;const x=m.map(u=>d[u].data),y=m.indexOf("d");if(Q(x,y),o){const u=s.find(I=>I.type==="d");u.value=a.toString(),u.pickerIndex=c}l=v(),this.refreshColumns([y],l)}l=v(),f()}}function v(){return m.map(r=>{const e=s.find(t=>t.type===r);return(e==null?void 0:e.pickerIndex)||0})}function f(){const r=E(s),e=document.querySelector(".demo-card-top .value span");e&&(e.textContent=N(r,"yyyy/MM/dd HH:mm"))}function z(r){const e=q(r.value,r.filter);return{allData:e,formattedValue:Object.entries(e).map(([t,{selected:i,data:n}],a)=>({index:a,type:t,value:i,pickerIndex:Math.max(n.findIndex(c=>c===i),0)}))}}function K(r){const e=document.querySelector(".mobile-picker .mobile-picker-view-container");if(e){let t="";r.forEach(i=>{t+=`<div class="mobile-picker-view">
          <div class="mobile-picker-view-item-container">
            ${b(i)}
          </div>
        </div>`}),e.innerHTML=t}}function Q(r,e){const t=document.querySelector(`.mobile-picker .mobile-picker-view-container .mobile-picker-view:nth-child(${e+1}) .mobile-picker-view-item-container`);if(t){let i="";i+=b(r[e]),t.innerHTML=i}}function b(r){let e="";return r.forEach(t=>{e+=`<div class="mobile-picker-view-item">${t}</div>`}),e}k.registerLanguage("typescript",D);k.registerLanguage("html",S);k.registerLanguage("scss",w);customElements.whenDefined("mdui-card").then(()=>{R(),h({html:A,css:B,ts:G,types:F,utils:j}),k.highlightAll()});
