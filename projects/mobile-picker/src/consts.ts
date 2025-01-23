import { MomentumConfig, PickerOptions } from './types';

export const TransitionDurationForFix = 500;
export const DefaultMomentumConfig: MomentumConfig = {
  time: 300, // ms
  distance: 20, // px
  duration: 2000, // ms
  deceleration: 0.002, // 减速度
};

export const DefaultOptions: PickerOptions = {
  selectedIndexes: [],
  usePointerEvents: false,
  scrollShape: 'flat',
  moveThreshold: 20,
};
