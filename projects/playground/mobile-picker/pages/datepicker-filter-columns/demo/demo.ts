import { Picker, ValueOrNull, } from "@ysx-libs/mobile-picker";
import { genOptions, updateDay, updateHour, updateMinute, updateMonth, updateSecond, validModeList, valueToDate } from "../../../utils/date";
import { ColumnType, DatePickerOptions, FormattedValue, GenFullRes } from "../../../types/date-picker";
import { format } from "date-fns";

const defaultProps: DatePickerOptions = {
  value: null, // 可设默认值比如：new Date(2026, 3, 5, 11, 22)
  // mode决定列的种类和顺序
  mode: ['d', 'M', 'H', 'y'],
  filter: {
    y(value, date) {
      return +value > 2024 && +value <= 2026;
    },
    d(value, date) {
      return +value % 3 === 0;
    },
    M(value, date) {
      return +value > 0 && +value < 5;
    },
    H(value, date) {
      return +value % 2 === 0;
    },
  }
};

let allData: GenFullRes = {};
const validMode = validModeList(defaultProps.mode);
let formattedValue: FormattedValue[] = [];
let pickerIndexes: number[] = [];
let pickerInstance: ValueOrNull<Picker> = null;

export function run() {
  const data = initData(defaultProps);
  allData = data.allData;
  formattedValue = data.formattedValue;
  // console.log('formattedValue>>>', allData, formattedValue);
  const pickerOptions = validMode.map((item) => allData[item]!.data);
  pickerIndexes = valueToPickerIndexes();

  renderPickerViews(pickerOptions);
  renderLabel();

  pickerInstance = new Picker('.mobile-picker', {
    selectedIndexes: pickerIndexes,
    onChange(indexes, trigger, colIndex) {
      // console.log('onChange>>>', trigger);
      if (['wheel', 'drag', 'click'].includes(trigger)) {
        onChange(indexes, colIndex);
      }
    },
  });
}


function onChange(indexes: number[], colIndex: number) {

  const type = validMode[colIndex];
  const valueTarget = formattedValue.find((item) => item.type === type);
  if (!valueTarget) {
    return;
  }
  valueTarget.value = allData[type]!.data[indexes[colIndex]];
  valueTarget.pickerIndex = indexes[colIndex];


  // 过滤月
  yearChange(type);

  // 过滤日
  monthChange(type);

  // 过滤时
  dayChange(type);

  // 过滤分
  hourChange(type);

  // 过滤秒
  minuteChange(type);




  pickerIndexes = valueToPickerIndexes();
  // console.log('result>>>', pickerIndexes, formattedValue);
  renderLabel();
}


function yearChange(type: ColumnType) {
  if (type === 'y' && defaultProps.filter?.M) {
    const { newValue, newIndex, newOptions, valueChanged } = updateMonth(
      formattedValue,
      defaultProps.filter.M,
    );

    allData.M!.data = newOptions;
    const pickerOptions = validMode.map((item) => allData[item]!.data);
    const monthIndex = validMode.indexOf('M');
    renderPickerView(pickerOptions, monthIndex);

    if (valueChanged) {
      const monthTarget = formattedValue.find((item) => item.type === 'M')!;
      monthTarget.value = newValue.toString();
      monthTarget.pickerIndex = newIndex!;
      monthChange('M');
    }

    pickerIndexes = valueToPickerIndexes();
    pickerInstance!.refreshColumns([monthIndex], pickerIndexes);
  }
}

function monthChange(type: ColumnType) {
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
      dayChange('d');
    }

    pickerIndexes = valueToPickerIndexes();
    pickerInstance!.refreshColumns([dayIndex], pickerIndexes);
  }
}

function dayChange(type: ColumnType) {
  if (type === 'd' && defaultProps.filter?.H) {
    const { newValue, newIndex, newOptions, valueChanged } = updateHour(
      formattedValue,
      defaultProps.filter.H,
    );


    allData.H!.data = newOptions;
    const pickerOptions = validMode.map((item) => allData[item]!.data);
    const hourIndex = validMode.indexOf('H');
    renderPickerView(pickerOptions, hourIndex);


    if (valueChanged) {
      const hourTarget = formattedValue.find((item) => item.type === 'H')!;
      hourTarget.value = newValue.toString();
      hourTarget.pickerIndex = newIndex!;
      hourChange('H');
    }

    pickerIndexes = valueToPickerIndexes();
    pickerInstance!.refreshColumns([hourIndex], pickerIndexes);
  }
}

function hourChange(type: ColumnType) {
  if (type === 'H' && defaultProps.filter?.m) {
    const { newValue, newIndex, newOptions, valueChanged } = updateMinute(
      formattedValue,
      defaultProps.filter.m,
    );

    allData.m!.data = newOptions;
    const pickerOptions = validMode.map((item) => allData[item]!.data);
    const minuteIndex = validMode.indexOf('m');
    renderPickerView(pickerOptions, minuteIndex);


    if (valueChanged) {
      const minuteTarget = formattedValue.find((item) => item.type === 'm')!;
      minuteTarget.value = newValue.toString();
      minuteTarget.pickerIndex = newIndex!;
      minuteChange('m');
    }

    pickerIndexes = valueToPickerIndexes();
    pickerInstance!.refreshColumns([minuteIndex], pickerIndexes);
    console.log('hour change>>>', pickerIndexes);
  }
}

function minuteChange(type: ColumnType) {
  if (type === 'm' && defaultProps.filter?.s) {
    const { newValue, newIndex, newOptions, valueChanged } = updateSecond(
      formattedValue,
      defaultProps.filter.s,
    );

    allData.m!.data = newOptions;
    const pickerOptions = validMode.map((item) => allData[item]!.data);
    const secondIndex = validMode.indexOf('s');
    renderPickerView(pickerOptions, secondIndex);


    if (valueChanged) {
      const secondTarget = formattedValue.find((item) => item.type === 's')!;
      secondTarget.value = newValue.toString();
      secondTarget.pickerIndex = newIndex!;
    }

    pickerIndexes = valueToPickerIndexes();
    pickerInstance!.refreshColumns([secondIndex], pickerIndexes);
  }
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
  console.log('allData>>>', allData);
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