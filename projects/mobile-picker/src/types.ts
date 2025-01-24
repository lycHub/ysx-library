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

export interface PickerBaseOptions {
  usePointerEvents: boolean;
  scrollShape:
    | PickerDefScrollShape
    | ((y: number, itemHeight: number, items?: NodeList) => void);
  moveThreshold: number;
  momentum: MomentumConfig | false;
}

export interface PickerViewOptions extends PickerBaseOptions {
  selectedIndex: number;
  onChange(event: number): void;
}

export interface PickerOptions extends PickerBaseOptions {
  selectedIndexes: number[];
  onChange?(event: number[]): void;
}
