

function closest(el: HTMLElement, selector: string) {
  let result = null;
  while (el && !result) {
    if (el?.matches && el.matches(selector)) {
      result = el;
    }
    el = el.parentNode as HTMLElement;
  }
  return result;
}

function getRect(target: HTMLElement) {
  return target.getBoundingClientRect();
}

function beyondBoundary(target: HTMLElement, container: HTMLElement): {
  left: boolean;
  right: boolean;
  top: boolean;
  bottom: boolean;
} {
  const targetRect = getRect(target);
  const containerRect = getRect(container);
  return {
    left: targetRect.left - containerRect.left < 0,
    right: targetRect.right - containerRect.right > 0,
    top: targetRect.top - containerRect.top < 0,
    bottom: targetRect.bottom - containerRect.bottom > 0,
  }
}


function index(el: HTMLElement, selector?: string) {
  let index = 0;

  if (!el || !el.parentNode) {
    return -1;
  }

  let preEl = el.previousElementSibling as HTMLElement;

  while (preEl) { // 获取el前面离他最近的兄弟元素
    if (!selector || preEl.matches(selector)) {
      // 兄弟符合条件就加一
      index++;
    }
    preEl = preEl.previousElementSibling as HTMLElement;
  }
  // 最终返回el所在的索引
  return index;
}

function isRectEqual(rect1: DOMRect, rect2: DOMRect) {
  return Math.round(rect1.top) === Math.round(rect2.top) &&
    Math.round(rect1.left) === Math.round(rect2.left) &&
    Math.round(rect1.height) === Math.round(rect2.height) &&
    Math.round(rect1.width) === Math.round(rect2.width);
}

export {
  closest,
  getRect,
  beyondBoundary,
  index,
  isRectEqual
}