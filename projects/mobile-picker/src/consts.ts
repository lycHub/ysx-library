import {
  ClickToSelectConfig,
  MomentumConfig,
  MouseWheelConfig,
  PickerOptions,
} from './types';

export const TransitionDurationForFix = 500;
export const TransitionDurationForWheel = 300;
export const DefaultMomentumConfig: MomentumConfig = {
  time: 300, // ms
  distance: 15, // px
  duration: 2500, // ms
  deceleration: 0.0015, // 减速度
};

export const DefaultClickToSelectConfig: ClickToSelectConfig = {
  duration: 300,
};

export const DefaultMouseWheelConfig: MouseWheelConfig = {
  speed: 20,
  discreteTime: 400,
};

export const DefaultOptions: PickerOptions = {
  selectedIndexes: [],
  usePointerEvents: false,
  scrollShape: 'scale',
  moveThreshold: 20,
  momentum: DefaultMomentumConfig,
  itemClassName: 'mobile-picker-view-item',
  clickToSelect: false,
  mouseWheel: false,
  onlyLeftButton: true,
};

export enum MouseWheelDirection {
  Default = 0,
  DOWN = -1,
  Up = 1,
}
