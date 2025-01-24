import { IOS, Safari } from './utils/browser';
import {
  ValueOrNull,
  PointEventType,
  PickerDefScrollShape,
  PickerViewOptions,
} from './types';
import {
  clamp,
  DraggingCls,
  DragStartCls,
  exceedBoundary,
  momentum,
  ScrollShapeStrategies,
  validSelectedIndex,
} from './utils/tool';
import { getClientCoordinateFromEvent } from './utils/coordinateFromEvent';
import { isFunction } from './utils/is';
import { DefaultMomentumConfig, TransitionDurationForFix } from './consts';

interface MetaInfo {
  itemContainer?: HTMLElement;
  items?: HTMLCollection;
  listContainerHeight: number;
  itemHeight: number;
  minScrollY: number;
  maxScrollY: number;
  limitMinScrollY: number;
  limitMaxScrollY: number;
}

interface DragStartInfo {
  time: number;
  startY: number;
  pointY: number;
}

export class PickerView {
  #inTransition = false;
  #needToUpdatedIndex = -1;
  #currentY = 0;
  #ownDocument: ValueOrNull<Document> = null;
  metaInfo: MetaInfo = {
    listContainerHeight: 0,
    itemHeight: 0,
    minScrollY: 0,
    maxScrollY: 0,
    limitMinScrollY: 0,
    limitMaxScrollY: 0,
  };
  #dragStartInfo: ValueOrNull<DragStartInfo> = null;

  #moveEventController: ValueOrNull<AbortController> = null;
  #endEventController: ValueOrNull<AbortController> = null;
  #transitionEndEventController: ValueOrNull<AbortController> = null;

  readonly #canPointer: boolean;
  readonly #momentumConfig: PickerViewOptions['momentum'];
  innerSelectedIndex = 0;

  constructor(
    readonly rootNode: HTMLElement,
    readonly options: PickerViewOptions
  ) {
    // console.log('PickerView', options);

    this.#canPointer = options.usePointerEvents
      ? 'PointerEvent' in window && (!Safari || IOS)
      : false;

    this.#momentumConfig =
      options.momentum === false
        ? false
        : { ...DefaultMomentumConfig, ...options.momentum };

    this.#init();
    this.#initEvents();
    this.setIndex(this.options.selectedIndex);
  }

  #init() {
    const itemContainer = this.rootNode.firstElementChild as HTMLElement;
    const firstItem = itemContainer?.firstElementChild as HTMLElement;
    if (this.#inTransition || !firstItem) return;
    const maxScrollY = 0;
    const minScrollY = -itemContainer.offsetHeight + firstItem.offsetHeight;
    this.metaInfo = {
      itemContainer,
      items: itemContainer.children,
      // containerHeight: containerRef.current.offsetHeight, // 320
      listContainerHeight: itemContainer.offsetHeight, // 722
      itemHeight: firstItem.offsetHeight,
      maxScrollY,
      minScrollY,
      limitMinScrollY: minScrollY - this.options.moveThreshold,
      limitMaxScrollY: maxScrollY + this.options.moveThreshold,
    };

    console.log('metaInfo', this.metaInfo);
  }

  #initEvents() {
    if (this.#canPointer) {
      this.rootNode.addEventListener(
        'pointerdown',
        this.#startHandler.bind(this)
      );
    } else {
      this.rootNode.addEventListener(
        'touchstart',
        this.#startHandler.bind(this)
      );
      this.rootNode.addEventListener(
        'mousedown',
        this.#startHandler.bind(this)
      );
    }

    this.metaInfo.itemContainer!.addEventListener(
      'transitionend',
      this.#transitionEndHandler.bind(this)
    );
  }

  setIndex(event: number) {
    if (!this.metaInfo.items?.length) return this.innerSelectedIndex;
    const validIndex = validSelectedIndex(
      event,
      this.metaInfo.items.length - 1
    );
    if (this.innerSelectedIndex !== validIndex) {
      this.#transitionDuration();
      this.#needToUpdatedIndex = -1;
      this.#saveIndex(validIndex);
      const y = this.#findYByIndex(validIndex);
      this.#transitionY(y);
    }
    return validIndex;
  }

  /* refresh(event: number) {
    console.log('refresh', event);
    this.#transitionDuration();
    this.#needToUpdatedIndex = -1;
    this.#init();
    return this.setIndex(event);
  } */

  #startHandler(event: PointEventType) {
    const clientCoordinate = getClientCoordinateFromEvent(event);
    if (this.#dragStartInfo || !clientCoordinate) {
      return;
    }
    this.#transitionDuration();
    this.#needToUpdatedIndex = -1;

    this.rootNode.classList.add(DragStartCls);

    this.#dragStartInfo = {
      time: Date.now(),
      startY: clientCoordinate.clientY,
      pointY: clientCoordinate.clientY,
    };
    // console.log('dragStartInfo', this.#dragStartInfo);

    const target = event.target as HTMLDivElement;
    this.#ownDocument = target.ownerDocument;
    this.#moveEventController = new AbortController();
    this.#endEventController = new AbortController();
    this.#transitionEndEventController = new AbortController();

    if (this.#canPointer) {
      this.rootNode.setPointerCapture((event as PointerEvent).pointerId);
      this.#ownDocument.addEventListener(
        'pointermove',
        this.#moveHandler.bind(this),
        {
          signal: this.#moveEventController.signal,
        }
      );
      this.#ownDocument.addEventListener(
        'pointerup',
        this.#endHandler.bind(this),
        {
          signal: this.#endEventController.signal,
        }
      );
      this.#ownDocument.addEventListener(
        'pointercancel',
        this.#endHandler.bind(this),
        {
          signal: this.#endEventController.signal,
        }
      );
    } else {
      this.#ownDocument.addEventListener(
        'mousemove',
        this.#moveHandler.bind(this),
        {
          signal: this.#moveEventController.signal,
        }
      );
      this.#ownDocument.addEventListener(
        'touchmove',
        this.#moveHandler.bind(this),
        {
          signal: this.#moveEventController.signal,
        }
      );
      this.#ownDocument.addEventListener(
        'mouseup',
        this.#endHandler.bind(this),
        {
          signal: this.#endEventController.signal,
        }
      );
      this.#ownDocument.addEventListener(
        'touchend',
        this.#endHandler.bind(this),
        {
          signal: this.#endEventController.signal,
        }
      );
      this.#ownDocument.addEventListener(
        'touchcancel',
        this.#endHandler.bind(this),
        {
          signal: this.#endEventController.signal,
        }
      );
    }
  }
  #moveHandler(event: PointEventType) {
    const clientCoordinate = getClientCoordinateFromEvent(event);
    if (!this.rootNode || !this.#dragStartInfo || !clientCoordinate) return;
    this.rootNode.classList.remove(DragStartCls);
    this.rootNode.classList.add(DraggingCls);
    const { pointY } = this.#dragStartInfo;
    const deltaY = clientCoordinate.clientY - pointY; // -下
    this.#dragStartInfo.pointY = clientCoordinate.clientY;

    const { minScrollY, maxScrollY, limitMinScrollY, limitMaxScrollY } =
      this.metaInfo;
    let newY = this.#currentY + deltaY;
    if (exceedBoundary(newY, minScrollY, maxScrollY)) {
      newY = clamp(
        this.#currentY + deltaY / 3,
        limitMinScrollY,
        limitMaxScrollY
      );
    }
    // console.log('newY>>>', newY);
    this.#transitionY(newY);
  }
  #endHandler(event: PointEventType) {
    if (!this.rootNode || !this.#dragStartInfo) return;
    if (this.#canPointer) {
      this.rootNode.releasePointerCapture((event as PointerEvent).pointerId);
    }

    let selectedIndex = 0;
    let duration = TransitionDurationForFix;
    let newY = this.#currentY;
    const { limitMinScrollY, limitMaxScrollY, minScrollY, maxScrollY } =
      this.metaInfo;
    const fixedY = this.#fixedBoundaryPosition();
    // console.log('fixedY', fixedY);
    if (fixedY) {
      newY = fixedY;
    } else {
      const clientCoordinate = getClientCoordinateFromEvent(event)!;
      const { time, startY, pointY } = this.#dragStartInfo!;
      const endTime = Date.now();
      const timeDiff = endTime - time;
      const absDistY = Math.abs(Math.round(clientCoordinate.clientY) - startY);
      if (
        this.#momentumConfig &&
        timeDiff < this.#momentumConfig.time &&
        absDistY > this.#momentumConfig.distance
      ) {
        // console.log('momentum run', timeDiff, absDistY);
        const destination = momentum(
          pointY,
          startY,
          timeDiff,
          this.#momentumConfig
        );
        duration = this.#momentumConfig.duration;
        newY = this.#currentY + destination;
        if (exceedBoundary(newY, minScrollY, maxScrollY)) {
          duration = TransitionDurationForFix;
        }
      }
    }

    const { index, y } = this.#findNearestItem(newY);
    newY = y;
    selectedIndex = index;
    // console.log('end newY', index, newY);

    if (newY !== this.#currentY) {
      newY = clamp(newY, limitMinScrollY, limitMaxScrollY);
      this.#transitionDuration(duration);
      this.#transitionY(newY);
      this.#needToUpdatedIndex = selectedIndex;
    }
    this.#cleanup();
  }

  #transitionEndHandler() {
    // console.log('transitionEndHandler');
    //  todo: onScrollEnd
    const fixedY = this.#fixedBoundaryPosition();
    if (fixedY === null) {
      this.#transitionDuration(0);
      if (this.#needToUpdatedIndex > -1) {
        this.#saveIndex(this.#needToUpdatedIndex);
        this.options.onChange(this.#needToUpdatedIndex);
        this.#needToUpdatedIndex = -1;
      }
    } else {
      this.#transitionDuration(TransitionDurationForFix);
      this.#transitionY(fixedY);
    }
  }

  #saveIndex(event: number) {
    this.innerSelectedIndex = event;
  }

  #findNearestItem(event: number) {
    if (!this.metaInfo.items?.length) return { index: -1, y: 0 };
    const { itemHeight, items } = this.metaInfo;
    let index = -1;
    let newY = 0;
    const validEvent = Math.min(0, event);
    index = clamp(
      Math.round(Math.abs(validEvent) / itemHeight),
      0,
      items.length - 1
    );
    newY = index * itemHeight * (validEvent / (Math.abs(validEvent) || 1));
    return {
      index,
      y: newY,
    };
  }

  #findYByIndex(index: number) {
    if (!this.metaInfo.items?.length) return 0;
    const { itemHeight } = this.metaInfo;
    return -index * itemHeight;
  }

  #fixedBoundaryPosition() {
    let result = null;
    const { minScrollY, maxScrollY } = this.metaInfo;
    if (exceedBoundary(this.#currentY, minScrollY, maxScrollY)) {
      result = this.#currentY > maxScrollY ? maxScrollY : minScrollY;
    }
    return result;
  }

  #transitionDuration(duration = 0) {
    this.#inTransition = duration > 0;
    this.rootNode.style.setProperty(
      '--picker-transit-duration',
      `${duration}ms`
    );
  }

  #transitionY(y: number) {
    if (!this.rootNode || this.#currentY === y) return;
    this.rootNode.style.setProperty('--picker-transit-y', `${y}px`);
    this.#currentY = y;
    const { items, itemHeight } = this.metaInfo;
    const { scrollShape } = this.options;
    let strategy: ValueOrNull<
      (y: number, itemHeight: number, items?: HTMLCollection) => void
    > = ScrollShapeStrategies.flat;
    if (items!.length > 3) {
      strategy = isFunction(scrollShape)
        ? scrollShape
        : ScrollShapeStrategies[scrollShape as PickerDefScrollShape];
    }
    if (strategy) {
      strategy(y, itemHeight, items);
    }
  }

  #cleanup() {
    this.rootNode.classList.remove(DragStartCls);
    this.rootNode.classList.remove(DraggingCls);
    this.#dragStartInfo = null;

    this.#moveEventController!.abort();
    this.#endEventController!.abort();
    this.#transitionEndEventController!.abort();
    this.#moveEventController = null;
    this.#endEventController = null;
    this.#transitionEndEventController = null;
    // todo: 解绑transitionEnd 和 start
  }
}
