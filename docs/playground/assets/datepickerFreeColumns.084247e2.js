import"./modulepreload-polyfill.b7f2da20.js";import"./index.c7835f9b.js";import{s as h,r as I}from"./tool.19296855.js";import{H as m,t as V,x as D}from"./xml.7ceb4a85.js";import{v as S,u as P,a as C,f as M,g as T,t as O,b as L}from"./date.38f454db.js";import{P as H}from"./mobile-picker.es.0a103c63.js";var E=`<!doctype html>\r
<html lang="en">\r
\r
<head>\r
  <meta charset="UTF-8" />\r
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />\r
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\r
  <title>DatePicker \u81EA\u7531\u5217</title>\r
</head>\r
\r
<body>\r
  <div class="page demo simple">\r
    <mdui-card class="demo-card" variant="outlined">\r
      <div class="demo-card-top">\r
        <p>mode: (\u65E5/\u6708/\u65F6)</p>\r
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
</html>`,F=`@import "@ysx-libs/mobile-picker/style.css";\r
\r
.mobile-picker {\r
  --picker-container-height: 380px;\r
  --overlay-color: rgba(var(--mdui-color-surface-container), 0.4), rgba(var(--mdui-color-surface-container), 0.8);\r
  --picker-overlay-border-color: rgb(var(--mdui-color-surface-variant));\r
}`,B=`import { Picker, } from "@ysx-libs/mobile-picker";\r
import { genOptions, updateDay, validModeList, valueToDate } from "../../../utils/date";\r
import { ColumnType, DatePickerOptions, FormattedValue, GenFullRes } from "../../../types/date-picker";\r
import { format } from "date-fns";\r
\r
const defaultProps: DatePickerOptions = {\r
  value: null, // \u53EF\u8BBE\u9ED8\u8BA4\u503C\u6BD4\u5982\uFF1Anew Date(2026, 3, 5, 11, 22)\r
  // mode\u51B3\u5B9A\u5217\u7684\u79CD\u7C7B\u548C\u987A\u5E8F\r
  mode: ['d', 'M', 'H'],\r
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
}`;const v={value:null,mode:["d","M","H"]};let c={};const d=S(v.mode);let o=[],l=[];function q(){const r=$(v);c=r.allData,o=r.formattedValue;const e=d.map(i=>c[i].data);l=u(),N(e),f();const t=new H(".mobile-picker",{selectedIndexes:l,onChange(i,n,a){["wheel","drag","click"].includes(n)&&A.call(t,i,a)}})}function A(r,e){var n;const t=d[e],i=o.find(a=>a.type===t);if(!!i){if(i.value=c[t].data[r[e]],i.pickerIndex=r[e],t==="M"){const{newValue:a,newIndex:p,newOptions:y,valueChanged:b}=P(o,(n=v.filter)==null?void 0:n.d);c.d.data=y;const x=d.map(s=>c[s].data),k=d.indexOf("d");if(j(x,k),b){const s=o.find(w=>w.type==="d");s.value=a.toString(),s.pickerIndex=p}l=u(),this.refreshColumns([k],l)}l=u(),f()}}function u(){return d.map(r=>{const e=o.find(t=>t.type===r);return(e==null?void 0:e.pickerIndex)||0})}function f(){const r=C(o),e=document.querySelector(".demo-card-top .value span");e&&(e.textContent=M(r,"yyyy/MM/dd HH:mm"))}function $(r){const e=T(r.value,r.filter);return{allData:e,formattedValue:Object.entries(e).map(([t,{selected:i,data:n}],a)=>({index:a,type:t,value:i,pickerIndex:Math.max(n.findIndex(p=>p===i),0)}))}}function N(r){const e=document.querySelector(".mobile-picker .mobile-picker-view-container");if(e){let t="";r.forEach(i=>{t+=`<div class="mobile-picker-view">
          <div class="mobile-picker-view-item-container">
            ${g(i)}
          </div>
        </div>`}),e.innerHTML=t}}function j(r,e){const t=document.querySelector(`.mobile-picker .mobile-picker-view-container .mobile-picker-view:nth-child(${e+1}) .mobile-picker-view-item-container`);if(t){let i="";i+=g(r[e]),t.innerHTML=i}}function g(r){let e="";return r.forEach(t=>{e+=`<div class="mobile-picker-view-item">${t}</div>`}),e}m.registerLanguage("typescript",V);m.registerLanguage("html",D);m.registerLanguage("scss",h);customElements.whenDefined("mdui-card").then(()=>{q(),I({html:E,css:F,ts:B,types:O,utils:L}),m.highlightAll()});
