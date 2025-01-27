export type ValueOrNull<T> = T | null;
export type EventHandler<T = Event> = (event: T) => void;
export type ClientCoordinate = { clientX: number; clientY: number };
export type PickerDefScrollShape = 'scale' | 'flat' | 'rotate';

export type PointEventType = PointerEvent | MouseEvent | TouchEvent;

export interface MomentumConfig {
  time: number;
  distance: number;
  duration: number;
  deceleration: number;
}

export interface ClickToSelectConfig {
  duration: number;
}

export interface InnerClickToSelectConfig extends ClickToSelectConfig {
  enable: boolean;
}

export interface MouseWheelConfig {
  speed: number;
  discreteTime: number;
}

export interface InnerMouseWheelConfig extends MouseWheelConfig {
  enable: boolean;
}

export type ShapeFunc = (y: number, itemHeight: number, items?: HTMLCollection) => void;

export interface PickerBaseOptions {
  usePointerEvents: boolean;
  scrollShape:
  | PickerDefScrollShape
  | ShapeFunc;
  moveThreshold: number;
  momentum: MomentumConfig | false;
  itemClassName: string;
  clickToSelect: boolean | ClickToSelectConfig;
  mouseWheel: boolean | MouseWheelConfig;
}

export type ChangeTrigger = 'click' | 'drag' | 'init' | 'api' | 'wheel' | '';
export interface PickerViewOptions extends PickerBaseOptions {
  selectedIndex: number;
  onChange(event: number, trigger: ChangeTrigger): void;
}



export interface PickerOptions extends PickerBaseOptions {
  selectedIndexes: number[];
  onChange?(event: number[], trigger: ChangeTrigger, colIndex: number): void;
}
