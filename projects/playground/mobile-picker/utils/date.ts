import { ColumnType, DateFilter, DateFilterFunc, DatePickerOptions, FormattedValue, GenFullRes, GenRes } from "../types/date-picker";
import {
  getDate,
  getDaysInMonth,
  getHours,
  getMinutes,
  getMonth,
  getSeconds,
  getYear,
  isValid,
  parse,
} from 'date-fns';

export const FullMode: ColumnType[] = ['y', 'M', 'd', 'H', 'm', 's'];
export const DefaultMode: ColumnType[] = ['y', 'M', 'd', 'H', 'm'];

export function validModeList(mode: ColumnType[]): ColumnType[] {
  const res = Array.from(new Set(mode)).filter((item) =>
    FullMode.includes(item),
  );
  return res?.length ? res : DefaultMode;
}

function getValidDate(selectedDate: DatePickerOptions['value']): Date {
  return isValid(selectedDate) ? selectedDate! : new Date();
}

export function getDateRangeEnum(
  min: number,
  max: number,
  date: Date,
  filter?: DateFilterFunc,
): string[] {
  const data = [];
  // eslint-disable-next-line no-plusplus
  for (let i = min; i <= max; i++) {
    const pass = filter?.(i.toString(), date) ?? true;
    if (pass) {
      data.push(i.toString());
    }
  }
  return data;
}


function genYears(
  selected: Date,
  filter: DateFilterFunc,
): GenRes {
  // todo: 当用户传的value和filter冲突时，是否需要校验selected是否在data中？
  return {
    selected: getYear(selected).toString(),
    data: getDateRangeEnum(1970, 2099, selected, filter),
  };
}

function genMonths(selected: Date, filter?: DateFilterFunc): GenRes {
  return {
    selected: (getMonth(selected) + 1).toString(),
    data: getDateRangeEnum(1, 12, selected, filter),
  };
}

function genDays(selected: Date, filter?: DateFilterFunc): GenRes {
  const y = getYear(selected);
  const m = getMonth(selected);
  const d = getDate(selected);
  const days = getDaysInMonth(new Date(y, m));
  return {
    selected: d.toString(),
    data: getDateRangeEnum(1, days, selected, filter),
  };
}

function genHours(selected: Date, filter?: DateFilterFunc): GenRes {
  return {
    selected: getHours(selected).toString(),
    data: getDateRangeEnum(0, 23, selected, filter),
  };
}
function genMins(selected: Date, filter?: DateFilterFunc): GenRes {
  return {
    selected: getMinutes(selected).toString(),
    data: getDateRangeEnum(0, 59, selected, filter),
  };
}
function genSecs(selected: Date, filter?: DateFilterFunc): GenRes {
  return {
    selected: getSeconds(selected).toString(),
    data: getDateRangeEnum(0, 59, selected, filter),
  };
}

export function genOptions(
  event: DatePickerOptions['value'],
  filter?: DateFilter,
): GenFullRes {
  // const modes = validModeList(mode);
  const validDate = getValidDate(event);
  const allData: Record<ColumnType, GenRes> = {
    y: genYears(validDate, filter?.y || defaultYearFilter),
    M: genMonths(validDate, filter?.M),
    d: genDays(validDate, filter?.d),
    H: genHours(validDate, filter?.H),
    m: genMins(validDate, filter?.m),
    s: genSecs(validDate, filter?.s),
  };
  return allData;
}


function defaultYearFilter(value: string, date: Date) {
  const currentYear = getYear(date);
  return +value >= currentYear - 10 && +value <= currentYear + 10;
}


export function valueToDate(formattedValue: FormattedValue[]): Date {
  const dates: string[] = [];
  const types: string[] = [];
  formattedValue.forEach(({ type, value }) => {
    dates.push(value);
    let formattedType = '';
    switch (type) {
      case 'y':
        formattedType = 'yyyy';
        break;
      default:
        formattedType = type;
        break;
    }
    types.push(formattedType);
  });
  return parse(dates.join('/'), types.join('/'), new Date());
}


export function updateMonth(
  formattedValue: FormattedValue[],
  filter: DateFilterFunc,
) {
  const y = +formattedValue.find((item) => item.type === 'y')!.value;
  const newOptions = getDateRangeEnum(1, 12, new Date(y), filter);
  const currentMonthValue = formattedValue.find((item) => item.type === 'M')!.value;
  const newIndex = newOptions.findIndex(item => item === currentMonthValue);
  const newValue = newIndex > -1 ? newOptions[newIndex] : newOptions[0];
  return {
    newValue,
    newIndex: Math.max(newIndex, 0),
    newOptions,
    valueChanged: newValue !== currentMonthValue,
  };
}

export function updateDay(
  formattedValue: FormattedValue[],
  filter?: DateFilterFunc,
) {
  const y = +formattedValue.find((item) => item.type === 'y')!.value;
  const M = +formattedValue.find((item) => item.type === 'M')!.value - 1;
  const days = getDaysInMonth(new Date(y, M));
  const newOptions = getDateRangeEnum(1, days, new Date(y, M), filter);
  const currentDayValue = formattedValue.find((item) => item.type === 'd')!.value;
  const newIndex = newOptions.findIndex(item => item === currentDayValue);
  const newValue = newIndex > -1 ? newOptions[newIndex] : newOptions[0];
  return {
    newValue,
    newIndex: Math.max(newIndex, 0),
    newOptions,
    valueChanged: newValue !== currentDayValue,
  };
}

export function updateHour(
  formattedValue: FormattedValue[],
  filter: DateFilterFunc,
) {
  const y = +formattedValue.find((item) => item.type === 'y')!.value;
  const M = +formattedValue.find((item) => item.type === 'M')!.value - 1;
  const d = +formattedValue.find((item) => item.type === 'd')!.value;
  const newOptions = getDateRangeEnum(0, 23, new Date(y, M, d), filter);
  const currentHourValue = formattedValue.find((item) => item.type === 'H')!.value;
  const newIndex = newOptions.findIndex(item => item === currentHourValue);
  const newValue = newIndex > -1 ? newOptions[newIndex] : newOptions[0];
  return {
    newValue,
    newIndex: Math.max(newIndex, 0),
    newOptions,
    valueChanged: newValue !== currentHourValue,
  };
}

export function updateMinute(
  formattedValue: FormattedValue[],
  filter: DateFilterFunc,
) {
  const y = +formattedValue.find((item) => item.type === 'y')!.value;
  const M = +formattedValue.find((item) => item.type === 'M')!.value - 1;
  const d = +formattedValue.find((item) => item.type === 'd')!.value;
  const H = +formattedValue.find((item) => item.type === 'H')!.value;
  const newOptions = getDateRangeEnum(0, 59, new Date(y, M, d, H), filter);
  const currentMinuteValue = formattedValue.find((item) => item.type === 'm')!.value;
  const newIndex = newOptions.findIndex(item => item === currentMinuteValue);
  const newValue = newIndex > -1 ? newOptions[newIndex] : newOptions[0];
  return {
    newValue,
    newIndex: Math.max(newIndex, 0),
    newOptions,
    valueChanged: newValue !== currentMinuteValue,
  };
}

export function updateSecond(
  formattedValue: FormattedValue[],
  filter: DateFilterFunc,
) {
  const y = +formattedValue.find((item) => item.type === 'y')!.value;
  const M = +formattedValue.find((item) => item.type === 'M')!.value - 1;
  const d = +formattedValue.find((item) => item.type === 'd')!.value;
  const H = +formattedValue.find((item) => item.type === 'H')!.value;
  const m = +formattedValue.find((item) => item.type === 'm')!.value;
  const newOptions = getDateRangeEnum(0, 59, new Date(y, M, d, H, m), filter);
  const currentSecondValue = formattedValue.find((item) => item.type === 's')!.value;
  const newIndex = newOptions.findIndex(item => item === currentSecondValue);
  const newValue = newIndex > -1 ? newOptions[newIndex] : newOptions[0];
  return {
    newValue,
    newIndex: Math.max(newIndex, 0),
    newOptions,
    valueChanged: newValue !== currentSecondValue,
  };
}