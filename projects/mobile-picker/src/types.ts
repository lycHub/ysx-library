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

export interface PickerOptions {
  selectedIndexes: number[];
  onChange?(event: number[]): void;
  usePointerEvents: boolean;
  scrollShape:
    | PickerDefScrollShape
    | ((y: number, itemHeight: number, items?: NodeList) => void);
  moveThreshold: number;
}
