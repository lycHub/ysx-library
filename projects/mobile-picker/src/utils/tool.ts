import { MomentumConfig } from '../types';

export const DragStartCls = 'picker-drag-start';
export const DraggingCls = 'picker-dragging';
export const SelectedCls = 'picker-item-selected';

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function validSelectedIndex(value: number, itemCount: number) {
  const numValue = value || 0;
  return clamp(numValue, 0, itemCount);
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

const DefItemRotate = 15;
const DefItemScale = 0.1;

export function flatItems(items?: HTMLCollection) {
  if (!items?.length) return;
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < items.length; index++) {
    const item = items[index] as HTMLDivElement;
    item.style.transform = 'none';
  }
}

function scaleItems(y: number, itemHeight: number, items?: HTMLCollection) {
  if (!items?.length) return;
  for (let index = 0; index < items.length; index++) {
    const item = items[index] as HTMLDivElement;
    const scale = 1 - DefItemScale * Math.abs(y / itemHeight + index);
    item.style.transform = `scale(${scale.toFixed(2)})`;
  }
}

function rotateItems(y: number, itemHeight: number, items?: HTMLCollection) {
  if (!items?.length) return;
  for (let index = 0; index < items.length; index++) {
    const item = items[index] as HTMLDivElement;
    const deg = DefItemRotate * (y / itemHeight + index);
    item.style.transform = `rotateX(${deg.toFixed(0)}deg)`;
  }
}

export const ScrollShapeStrategies = {
  flat: null,
  scale: scaleItems,
  rotate: rotateItems,
};

function easeOut(progress: number): number {
  return 1 - Math.pow(1 - progress, 3);
}

export function requestMove({
  startPoi,
  duration,
  destPoi,
  onRunning,
  onEnd,
}: {
  startPoi: number;
  duration: number;
  destPoi: number;
  onRunning(event: number): void;
  onEnd(): void;
}) {
  const startTime = performance.now();
  let currentPoi = startPoi;
  let id = -1;
  let isCancelled = false;

  const step = (timestamp: number) => {
    if (isCancelled) {
      return;
    }
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1); // 确保进度不超过1

    const easedProgress = easeOut(progress);
    currentPoi = startPoi + (destPoi - startPoi) * easedProgress;
    onRunning(currentPoi);

    if (progress < 1) {
      id = requestAnimationFrame(step);
    } else {
      onEnd();
    }
  };
  id = requestAnimationFrame(step);

  const cancel = () => {
    if (!isCancelled) {
      isCancelled = true;
      cancelAnimationFrame(id);
    }
  };
  return {
    cancel,
  };
}
