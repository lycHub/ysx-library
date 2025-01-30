import { Picker, } from "@ysx-libs/mobile-picker";
import { DefaultMode, genOptions, updateDay, validModeList, valueToDate } from "../../../utils/date";
import { ColumnType, DatePickerOptions, FormattedValue, GenFullRes } from "../../../types/date-picker";
import { format, getDate, getHours, getMinutes, getMonth, getSeconds, getYear } from "date-fns";

let defaultProps: DatePickerOptions = {
  value: null,
  mode: DefaultMode
};

let allData: GenFullRes = {};
const validMode = validModeList(defaultProps.mode);
let formattedValue: FormattedValue[] = [];
let pickerIndexes: number[] = [];

export function run() {
  const data = initData(defaultProps);
  allData = data.allData;
  formattedValue = data.formattedValue;
  // console.log('formattedValue>>>', allData, formattedValue);
  const pickerOptions = validMode.map((item) => allData[item]!.data);
  pickerIndexes = valueToPickerIndexes();

  renderPickerViews(pickerOptions);
  renderLabel();

  const pickerInstance = new Picker('.mobile-picker', {
    selectedIndexes: pickerIndexes,
    onChange(indexes, trigger, colIndex) {
      // console.log('onChange>>>', trigger);
      if (['wheel', 'drag', 'click'].includes(trigger)) {
        onChange.call(pickerInstance, indexes, colIndex);
      }
    },
  });

  const formNode = document.getElementById('form');
  if (formNode) {
    formNode.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = formNode.querySelector('mdui-text-field[type="datetime-local"]') as HTMLInputElement;
      if (input) {
        setValue(new Date(input.value));
        pickerIndexes = valueToPickerIndexes();
        renderLabel();
        // console.log('setValue>>>', formattedValue);
        pickerInstance.setIndexes(pickerIndexes);
      }
    });
  }
}


function setValue(value: Date) {
  formattedValue.forEach(item => {
    switch (item.type) {
      case 'y':
        const y = getYear(value).toString();
        item.value = y;
        item.pickerIndex = allData.y!.data.findIndex((item) => item === y);
        break;
      case 'M':
        const M = (getMonth(value) + 1).toString();
        item.value = M;
        item.pickerIndex = allData.M!.data.findIndex((item) => item === M);
        break;
      case 'd':
        const d = getDate(value).toString();
        item.value = d;
        item.pickerIndex = allData.d!.data.findIndex((item) => item === d);
        break;
      case 'H':
        const H = getHours(value).toString();
        item.value = H;
        item.pickerIndex = allData.H!.data.findIndex((item) => item === H);
        break;
      case 'm':
        const m = getMinutes(value).toString();
        item.value = m;
        item.pickerIndex = allData.m!.data.findIndex((item) => item === m);
        break;
      case 's':
        const s = getSeconds(value).toString();
        item.value = s;
        item.pickerIndex = allData.s!.data.findIndex((item) => item === s);
        break;
    }
  });
}


function onChange(this: Picker, indexes: number[], colIndex: number) {

  const type = validMode[colIndex];
  const valueTarget = formattedValue.find((item) => item.type === type);
  if (!valueTarget) {
    return;
  }
  valueTarget.value = allData[type]!.data[indexes[colIndex]];
  valueTarget.pickerIndex = indexes[colIndex];

  if (type === 'M') {
    const { newValue, newIndex, newOptions, valueChanged } = updateDay(
      formattedValue,
      defaultProps.filter?.d,
    );

    allData.d!.data = newOptions;
    const pickerOptions = validMode.map((item) => allData[item]!.data);
    const dayIndex = validMode.indexOf('d');
    renderPickerView(pickerOptions, dayIndex);

    if (valueChanged) {
      const dayTarget = formattedValue.find((item) => item.type === 'd')!;
      dayTarget.value = newValue.toString();
      dayTarget.pickerIndex = newIndex!;
    }

    pickerIndexes = valueToPickerIndexes();

    this.refreshColumns([dayIndex], pickerIndexes);
    // this.refreshAll(pickerIndexes);
  }


  pickerIndexes = valueToPickerIndexes();
  // console.log('result>>>', pickerIndexes, formattedValue);
  renderLabel();
}

function valueToPickerIndexes() {
  return validMode.map((mItem) => {
    const target = formattedValue.find(
      (item) => item.type === mItem,
    );
    return target?.pickerIndex || 0;
  });
}

function renderLabel() {
  const selectedDate = valueToDate(formattedValue);
  const valueNode = document.querySelector('.demo-card-top .value span');
  if (valueNode) {
    valueNode.textContent = format(selectedDate, 'yyyy/MM/dd HH:mm');
  }
}




function initData(props: DatePickerOptions) {
  const allData = genOptions(
    props.value,
    props.filter,
  );
  return {
    allData,
    formattedValue: Object.entries(allData).map(
      ([key, { selected, data }], index) => ({
        index,
        type: key as ColumnType,
        value: selected,
        pickerIndex: Math.max(data.findIndex((item) => item === selected), 0),
      }),
    )
  }
}


function renderPickerViews(options: string[][]) {
  const pickerViewContainer = document.querySelector(
    '.mobile-picker .mobile-picker-view-container'
  );
  if (pickerViewContainer) {
    let pickerViewStr = '';
    options.forEach((colItem) => {
      const itemStr = getListHtmlStr(colItem);
      pickerViewStr += `<div class="mobile-picker-view">
          <div class="mobile-picker-view-item-container">
            ${itemStr}
          </div>
        </div>`;
    });
    pickerViewContainer.innerHTML = pickerViewStr;
  }
}


function renderPickerView(data: string[][], index: number) {
  const pickerView = document.querySelector(
    `.mobile-picker .mobile-picker-view-container .mobile-picker-view:nth-child(${index + 1}) .mobile-picker-view-item-container`
  );
  if (pickerView) {
    let pickerViewStr = '';
    const itemStr = getListHtmlStr(data[index]);
    pickerViewStr += itemStr;
    pickerView.innerHTML = pickerViewStr;
  }
}

function getListHtmlStr(list: string[]) {
  let str = '';
  list.forEach((item) => {
    str += `<div class="mobile-picker-view-item">${item}</div>`;
  });
  return str;
}