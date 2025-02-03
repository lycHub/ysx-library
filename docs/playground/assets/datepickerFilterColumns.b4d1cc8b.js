import"./modulepreload-polyfill.b7f2da20.js";import"./tabs.6bc04e7b.js";import{H as h,t as V,x as M}from"./xml.7ceb4a85.js";import{s as O}from"./scss.38479186.js";import{v as D,k as T,u as S,l as P,m as H,n as E,a as L,f as F,g as q,t as B,b as A}from"./date.38f454db.js";import{P as N}from"./mobile-picker.es.432436b2.js";var $=`<!doctype html>\r
<html lang="en">\r
\r
<head>\r
  <meta charset="UTF-8" />\r
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />\r
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\r
  <title>DatePicker \u8FC7\u6EE4\u5217</title>\r
</head>\r
\r
<body>\r
  <div class="page demo simple">\r
    <mdui-card class="demo-card" variant="outlined">\r
      <div class="demo-card-top">\r
      <p>mode: (\u65E5/\u6708/\u65F6/\u5E74)</p>\r
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
</html>`,j=`@import "@ysx-libs/mobile-picker/style.css";\r
\r
.mobile-picker {\r
  --picker-container-height: 380px;\r
  --overlay-color: rgba(var(--mdui-color-surface-container), 0.4), rgba(var(--mdui-color-surface-container), 0.8);\r
  --picker-overlay-border-color: rgb(var(--mdui-color-surface-variant));\r
}`,G=`import { Picker, ValueOrNull, } from "@ysx-libs/mobile-picker";\r
import { genOptions, updateDay, updateHour, updateMinute, updateMonth, updateSecond, validModeList, valueToDate } from "../../../utils/date";\r
import { ColumnType, DatePickerOptions, FormattedValue, GenFullRes } from "../../../types/date-picker";\r
import { format } from "date-fns";\r
\r
const defaultProps: DatePickerOptions = {\r
  value: null, // \u53EF\u8BBE\u9ED8\u8BA4\u503C\u6BD4\u5982\uFF1Anew Date(2026, 3, 5, 11, 22)\r
  // mode\u51B3\u5B9A\u5217\u7684\u79CD\u7C7B\u548C\u987A\u5E8F\r
  mode: ['d', 'M', 'H', 'y'],\r
  filter: {\r
    y(value, date) {\r
      return +value > 2024 && +value <= 2026;\r
    },\r
    d(value, date) {\r
      return +value % 3 === 0;\r
    },\r
    M(value, date) {\r
      return +value > 0 && +value < 5;\r
    },\r
    H(value, date) {\r
      return +value % 2 === 0;\r
    },\r
  }\r
};\r
\r
let allData: GenFullRes = {};\r
const validMode = validModeList(defaultProps.mode);\r
let formattedValue: FormattedValue[] = [];\r
let pickerIndexes: number[] = [];\r
let pickerInstance: ValueOrNull<Picker> = null;\r
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
  pickerInstance = new Picker('.mobile-picker', {\r
    selectedIndexes: pickerIndexes,\r
    onChange(indexes, trigger, colIndex) {\r
      // console.log('onChange>>>', trigger);\r
      if (['wheel', 'drag', 'click'].includes(trigger)) {\r
        onChange(indexes, colIndex);\r
      }\r
    },\r
  });\r
}\r
\r
\r
function onChange(indexes: number[], colIndex: number) {\r
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
  // \u8FC7\u6EE4\u6708\r
  yearChange(type);\r
\r
  // \u8FC7\u6EE4\u65E5\r
  monthChange(type);\r
\r
  // \u8FC7\u6EE4\u65F6\r
  dayChange(type);\r
\r
  // \u8FC7\u6EE4\u5206\r
  hourChange(type);\r
\r
  // \u8FC7\u6EE4\u79D2\r
  minuteChange(type);\r
\r
\r
\r
\r
  pickerIndexes = valueToPickerIndexes();\r
  // console.log('result>>>', pickerIndexes, formattedValue);\r
  renderLabel();\r
}\r
\r
\r
function yearChange(type: ColumnType) {\r
  if (type === 'y' && defaultProps.filter?.M) {\r
    const { newValue, newIndex, newOptions, valueChanged } = updateMonth(\r
      formattedValue,\r
      defaultProps.filter.M,\r
    );\r
\r
    allData.M!.data = newOptions;\r
    const pickerOptions = validMode.map((item) => allData[item]!.data);\r
    const monthIndex = validMode.indexOf('M');\r
    renderPickerView(pickerOptions, monthIndex);\r
\r
    if (valueChanged) {\r
      const monthTarget = formattedValue.find((item) => item.type === 'M')!;\r
      monthTarget.value = newValue.toString();\r
      monthTarget.pickerIndex = newIndex!;\r
      monthChange('M');\r
    }\r
\r
    pickerIndexes = valueToPickerIndexes();\r
    pickerInstance!.refreshColumns([monthIndex], pickerIndexes);\r
  }\r
}\r
\r
function monthChange(type: ColumnType) {\r
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
\r
    if (valueChanged) {\r
      const dayTarget = formattedValue.find((item) => item.type === 'd')!;\r
      dayTarget.value = newValue.toString();\r
      dayTarget.pickerIndex = newIndex!;\r
      dayChange('d');\r
    }\r
\r
    pickerIndexes = valueToPickerIndexes();\r
    pickerInstance!.refreshColumns([dayIndex], pickerIndexes);\r
  }\r
}\r
\r
function dayChange(type: ColumnType) {\r
  if (type === 'd' && defaultProps.filter?.H) {\r
    const { newValue, newIndex, newOptions, valueChanged } = updateHour(\r
      formattedValue,\r
      defaultProps.filter.H,\r
    );\r
\r
\r
    allData.H!.data = newOptions;\r
    const pickerOptions = validMode.map((item) => allData[item]!.data);\r
    const hourIndex = validMode.indexOf('H');\r
    renderPickerView(pickerOptions, hourIndex);\r
\r
\r
    if (valueChanged) {\r
      const hourTarget = formattedValue.find((item) => item.type === 'H')!;\r
      hourTarget.value = newValue.toString();\r
      hourTarget.pickerIndex = newIndex!;\r
      hourChange('H');\r
    }\r
\r
    pickerIndexes = valueToPickerIndexes();\r
    pickerInstance!.refreshColumns([hourIndex], pickerIndexes);\r
  }\r
}\r
\r
function hourChange(type: ColumnType) {\r
  if (type === 'H' && defaultProps.filter?.m) {\r
    const { newValue, newIndex, newOptions, valueChanged } = updateMinute(\r
      formattedValue,\r
      defaultProps.filter.m,\r
    );\r
\r
    allData.m!.data = newOptions;\r
    const pickerOptions = validMode.map((item) => allData[item]!.data);\r
    const minuteIndex = validMode.indexOf('m');\r
    renderPickerView(pickerOptions, minuteIndex);\r
\r
\r
    if (valueChanged) {\r
      const minuteTarget = formattedValue.find((item) => item.type === 'm')!;\r
      minuteTarget.value = newValue.toString();\r
      minuteTarget.pickerIndex = newIndex!;\r
      minuteChange('m');\r
    }\r
\r
    pickerIndexes = valueToPickerIndexes();\r
    pickerInstance!.refreshColumns([minuteIndex], pickerIndexes);\r
    console.log('hour change>>>', pickerIndexes);\r
  }\r
}\r
\r
function minuteChange(type: ColumnType) {\r
  if (type === 'm' && defaultProps.filter?.s) {\r
    const { newValue, newIndex, newOptions, valueChanged } = updateSecond(\r
      formattedValue,\r
      defaultProps.filter.s,\r
    );\r
\r
    allData.m!.data = newOptions;\r
    const pickerOptions = validMode.map((item) => allData[item]!.data);\r
    const secondIndex = validMode.indexOf('s');\r
    renderPickerView(pickerOptions, secondIndex);\r
\r
\r
    if (valueChanged) {\r
      const secondTarget = formattedValue.find((item) => item.type === 's')!;\r
      secondTarget.value = newValue.toString();\r
      secondTarget.pickerIndex = newIndex!;\r
    }\r
\r
    pickerIndexes = valueToPickerIndexes();\r
    pickerInstance!.refreshColumns([secondIndex], pickerIndexes);\r
  }\r
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
  console.log('allData>>>', allData);\r
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
}`;const m={value:null,mode:["d","M","H","y"],filter:{y(r,e){return+r>2024&&+r<=2026},d(r,e){return+r%3===0},M(r,e){return+r>0&&+r<5},H(r,e){return+r%2===0}}};let c={};const s=D(m.mode);let l=[],d=[],k=null;function R(){const r=z(m);c=r.allData,l=r.formattedValue;const e=s.map(t=>c[t].data);d=v(),K(e),b(),k=new N(".mobile-picker",{selectedIndexes:d,onChange(t,a,i){["wheel","drag","click"].includes(a)&&J(t,i)}})}function J(r,e){const t=s[e],a=l.find(i=>i.type===t);!a||(a.value=c[t].data[r[e]],a.pickerIndex=r[e],U(t),x(t),y(t),w(t),I(t),d=v(),b())}function U(r){var e;if(r==="y"&&((e=m.filter)==null?void 0:e.M)){const{newValue:t,newIndex:a,newOptions:i,valueChanged:u}=T(l,m.filter.M);c.M.data=i;const p=s.map(n=>c[n].data),o=s.indexOf("M");if(g(p,o),u){const n=l.find(f=>f.type==="M");n.value=t.toString(),n.pickerIndex=a,x("M")}d=v(),k.refreshColumns([o],d)}}function x(r){var e;if(r==="M"){const{newValue:t,newIndex:a,newOptions:i,valueChanged:u}=S(l,(e=m.filter)==null?void 0:e.d);c.d.data=i;const p=s.map(n=>c[n].data),o=s.indexOf("d");if(g(p,o),u){const n=l.find(f=>f.type==="d");n.value=t.toString(),n.pickerIndex=a,y("d")}d=v(),k.refreshColumns([o],d)}}function y(r){var e;if(r==="d"&&((e=m.filter)==null?void 0:e.H)){const{newValue:t,newIndex:a,newOptions:i,valueChanged:u}=P(l,m.filter.H);c.H.data=i;const p=s.map(n=>c[n].data),o=s.indexOf("H");if(g(p,o),u){const n=l.find(f=>f.type==="H");n.value=t.toString(),n.pickerIndex=a,w("H")}d=v(),k.refreshColumns([o],d)}}function w(r){var e;if(r==="H"&&((e=m.filter)==null?void 0:e.m)){const{newValue:t,newIndex:a,newOptions:i,valueChanged:u}=H(l,m.filter.m);c.m.data=i;const p=s.map(n=>c[n].data),o=s.indexOf("m");if(g(p,o),u){const n=l.find(f=>f.type==="m");n.value=t.toString(),n.pickerIndex=a,I("m")}d=v(),k.refreshColumns([o],d),console.log("hour change>>>",d)}}function I(r){var e;if(r==="m"&&((e=m.filter)==null?void 0:e.s)){const{newValue:t,newIndex:a,newOptions:i,valueChanged:u}=E(l,m.filter.s);c.m.data=i;const p=s.map(n=>c[n].data),o=s.indexOf("s");if(g(p,o),u){const n=l.find(f=>f.type==="s");n.value=t.toString(),n.pickerIndex=a}d=v(),k.refreshColumns([o],d)}}function v(){return s.map(r=>{const e=l.find(t=>t.type===r);return(e==null?void 0:e.pickerIndex)||0})}function b(){const r=L(l),e=document.querySelector(".demo-card-top .value span");e&&(e.textContent=F(r,"yyyy/MM/dd HH:mm"))}function z(r){const e=q(r.value,r.filter);return console.log("allData>>>",e),{allData:e,formattedValue:Object.entries(e).map(([t,{selected:a,data:i}],u)=>({index:u,type:t,value:a,pickerIndex:Math.max(i.findIndex(p=>p===a),0)}))}}function K(r){const e=document.querySelector(".mobile-picker .mobile-picker-view-container");if(e){let t="";r.forEach(a=>{t+=`<div class="mobile-picker-view">
          <div class="mobile-picker-view-item-container">
            ${C(a)}
          </div>
        </div>`}),e.innerHTML=t}}function g(r,e){const t=document.querySelector(`.mobile-picker .mobile-picker-view-container .mobile-picker-view:nth-child(${e+1}) .mobile-picker-view-item-container`);if(t){let a="";a+=C(r[e]),t.innerHTML=a}}function C(r){let e="";return r.forEach(t=>{e+=`<div class="mobile-picker-view-item">${t}</div>`}),e}h.registerLanguage("typescript",V);h.registerLanguage("html",M);h.registerLanguage("scss",O);const Q={html:$,css:j,ts:G,types:B,utils:A};function W(){document.querySelectorAll(".demo-code-content").forEach(e=>{e.querySelector("pre code").textContent=Q[e.value]})}customElements.whenDefined("mdui-card").then(()=>{R(),W(),h.highlightAll()});
