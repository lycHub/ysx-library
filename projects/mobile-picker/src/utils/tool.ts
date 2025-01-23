import { MomentumConfig } from '../types';

export const DragStartCls = 'picker-drag-start';
export const DraggingCls = 'picker-dragging';
export const SelectedCls = 'picker-item-selected';

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function exceedBoundary(value: number, min: number, max: number) {
  return value > max || value < min;
}

export function momentum(
  current: number,
  start: number,
  timeDiff: number,
  options: MomentumConfig
) {
  const distance = current - start;
  const speed = Math.abs(distance) / timeDiff;

  const { deceleration } = options;

  // deceleration是momentum动画的减速度
  const destination = (speed / deceleration) * (distance < 0 ? -1 : 1);

  // console.log('momentum', destination);

  return Math.round(destination);
}

const DefItemRotate = 25;
const DefItemScale = 0.1;

function scaleItems(y: number, itemHeight: number, items?: HTMLCollection) {
  if (!items?.length) return;
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < items.length; index++) {
    const item = items[index] as HTMLDivElement;
    // const scale = 1 - DefItemScale * Math.abs(y / itemHeight + index);
    const scale = clamp(
      1 - DefItemScale * Math.abs(y / itemHeight + index),
      0.5,
      1
    );

    item.style.transform = `scale(${scale.toFixed(2)})`;
  }
}

function rotateItems(y: number, itemHeight: number, items?: HTMLCollection) {
  if (!items?.length) return;
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < items.length; index++) {
    const item = items[index] as HTMLDivElement;
    const deg = DefItemRotate * (y / itemHeight + index);
    // const deg =
    //   DefItemRotate *
    //   clamp(y / itemHeight + index, -200 / DefItemRotate, 200 / DefItemRotate);
    item.style.transform = `rotateX(${deg.toFixed(0)}deg)`;
  }
}

export const ScrollShapeStrategies = {
  flat: null,
  scale: scaleItems,
  rotate: rotateItems,
};
