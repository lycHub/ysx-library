import { PickerBaseOptions, ValueOrNull } from "@ysx-libs/mobile-picker";

export interface FormattedValue {
  pickerIndex: number;
  index: number;
  type: ColumnType;
  value: string;
}

export interface GenYearEvent {
  selectedDate: ValueOrNull<Date>;
  min: Date;
  max: Date;
}

export interface GenRes {
  selected: string;
  data: string[];
}

export type ColumnType = 'y' | 'M' | 'd' | 'H' | 'm' | 's';

export type GenFullRes = {
  [key in ColumnType]?: GenRes;
};

export type DateFilterFunc = (value: string, date: Date) => boolean;

export type DateFilter = {
  [key in ColumnType]?: DateFilterFunc;
};

export interface DatePickerOptions extends Partial<PickerBaseOptions> {
  mode: ColumnType[];
  filter?: DateFilter;
  value: ValueOrNull<Date>;
  onChange?(event: Date, type: ColumnType): void;
}