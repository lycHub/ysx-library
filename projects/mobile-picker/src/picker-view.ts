import { IOS, Safari } from './utils/browser';
import {
  PickerOptions,
  ValueOrNull,
  PointEventType,
  PickerDefScrollShape,
} from './types';
import {
  clamp,
  DraggingCls,
  DragStartCls,
  exceedBoundary,
  ScrollShapeStrategies,
} from './utils/tool';
import { getClientCoordinateFromEvent } from './utils/coordinateFromEvent';
import { isFunction } from './utils/is';

interface MetaInfo {
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

  constructor(readonly rootNode: HTMLElement, readonly options: PickerOptions) {
    // console.log('PickerView', this.rootNode, options);
    this.#init();
    this.#canPointer = options.usePointerEvents
      ? 'PointerEvent' in window && (!Safari || IOS)
      : false;
  }

  #init() {
    if (this.#inTransition) return;
    const itemContainer = this.rootNode.firstElementChild as HTMLElement;
    const firstItem = itemContainer.firstElementChild as HTMLElement;
    const maxScrollY = 0;
    const minScrollY = -itemContainer.offsetHeight + firstItem.offsetHeight;
    this.metaInfo = {
      items: itemContainer.children,
      // containerHeight: containerRef.current.offsetHeight, // 320
      listContainerHeight: itemContainer.offsetHeight, // 722
      itemHeight: firstItem.offsetHeight,
      maxScrollY,
      minScrollY,
      limitMinScrollY: minScrollY - this.options.moveThreshold,
      limitMaxScrollY: maxScrollY + this.options.moveThreshold,
    };

    // console.log('metaInfo', this.metaInfo);

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
  }

  #startHandler(event: PointEventType) {
    const clientCoordinate = getClientCoordinateFromEvent(event);
    console.log('startHandler', clientCoordinate);
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
    console.log('endHandler', event);
    this.#cleanup();
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
  }
}
