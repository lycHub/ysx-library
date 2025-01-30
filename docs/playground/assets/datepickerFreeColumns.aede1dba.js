import"./modulepreload-polyfill.b7f2da20.js";import"./tabs.6bc04e7b.js";import{H as m,t as h,x as I}from"./xml.7ceb4a85.js";import{s as V}from"./scss.38479186.js";import{v as D,u as S,a as C,f as M,g as P,t as T,b as O}from"./date.38f454db.js";import{P as L}from"./mobile-picker.es.432436b2.js";var H=`<!doctype html>\r
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
      <mdui-tabs class="dcb-tabs" value="js">\r
        <mdui-tab value="types">types</mdui-tab>\r
        <mdui-tab value="utils">utils</mdui-tab>\r
        <mdui-tab value="js">js</mdui-tab>\r
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
        <mdui-tab-panel class="demo-code-content" slot="panel" value="js">\r
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
</html>`,E=`@import "@ysx-libs/mobile-picker/style.css";\r
\r
.mobile-picker {\r
  --picker-container-height: 380px;\r
  --overlay-color: rgba(var(--mdui-color-surface-container), 0.4), rgba(var(--mdui-color-surface-container), 0.8);\r
  --picker-overlay-border-color: rgb(var(--mdui-color-surface-variant));\r
}`,F=`import { Picker, } from "@ysx-libs/mobile-picker";\r
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
}`;const v={value:null,mode:["d","M","H"]};let l={};const c=D(v.mode);let o=[],d=[];function j(){const r=A(v);l=r.allData,o=r.formattedValue;const e=c.map(i=>l[i].data);d=u(),B(e),f();const t=new L(".mobile-picker",{selectedIndexes:d,onChange(i,n,a){["wheel","drag","click"].includes(n)&&q.call(t,i,a)}})}function q(r,e){var n;const t=c[e],i=o.find(a=>a.type===t);if(!!i){if(i.value=l[t].data[r[e]],i.pickerIndex=r[e],t==="M"){const{newValue:a,newIndex:p,newOptions:g,valueChanged:y}=S(o,(n=v.filter)==null?void 0:n.d);l.d.data=g;const x=c.map(s=>l[s].data),k=c.indexOf("d");if($(x,k),y){const s=o.find(w=>w.type==="d");s.value=a.toString(),s.pickerIndex=p}d=u(),this.refreshColumns([k],d)}d=u(),f()}}function u(){return c.map(r=>{const e=o.find(t=>t.type===r);return(e==null?void 0:e.pickerIndex)||0})}function f(){const r=C(o),e=document.querySelector(".demo-card-top .value span");e&&(e.textContent=M(r,"yyyy/MM/dd HH:mm"))}function A(r){const e=P(r.value,r.filter);return{allData:e,formattedValue:Object.entries(e).map(([t,{selected:i,data:n}],a)=>({index:a,type:t,value:i,pickerIndex:Math.max(n.findIndex(p=>p===i),0)}))}}function B(r){const e=document.querySelector(".mobile-picker .mobile-picker-view-container");if(e){let t="";r.forEach(i=>{t+=`<div class="mobile-picker-view">
          <div class="mobile-picker-view-item-container">
            ${b(i)}
          </div>
        </div>`}),e.innerHTML=t}}function $(r,e){const t=document.querySelector(`.mobile-picker .mobile-picker-view-container .mobile-picker-view:nth-child(${e+1}) .mobile-picker-view-item-container`);if(t){let i="";i+=b(r[e]),t.innerHTML=i}}function b(r){let e="";return r.forEach(t=>{e+=`<div class="mobile-picker-view-item">${t}</div>`}),e}m.registerLanguage("typescript",h);m.registerLanguage("html",I);m.registerLanguage("scss",V);const N={html:H,css:E,js:F,types:T,utils:O};function G(){document.querySelectorAll(".demo-code-content").forEach(e=>{e.querySelector("pre code").textContent=N[e.value]})}customElements.whenDefined("mdui-card").then(()=>{j(),G(),m.highlightAll()});
