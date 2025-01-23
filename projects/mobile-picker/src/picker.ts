import { PickerOptions, ValueOrNull } from './types';
import { DefaultOptions } from './consts';
import { PickerView } from './picker-view';

export class Picker {
  readonly rootNode: ValueOrNull<HTMLElement>;
  readonly innerOptions: PickerOptions;
  #pickerViewInstances: PickerView[] = [];
  constructor(root: HTMLElement | string, options: Partial<PickerOptions>) {
    this.rootNode =
      typeof root === 'string' ? document.querySelector(root) : root;
    if (!this.rootNode) {
      throw new Error('root node not found');
    }
    this.innerOptions = {
      ...DefaultOptions,
      ...options,
    };
    this.#initPickerView();
  }

  #initPickerView() {
    //  #pickerViewInstances
    const viewNodes = this.rootNode!.querySelectorAll('.mobile-picker-view');
    viewNodes.forEach((item) => {
      const viewInstance = new PickerView(
        item as HTMLElement,
        this.innerOptions
      );
      this.#pickerViewInstances.push(viewInstance);
    });

    const itemHeight = this.#pickerViewInstances[0]?.metaInfo?.itemHeight || 0;
    if (itemHeight > 0) {
      this.rootNode!.style.setProperty(
        '--picker-item-height',
        `${itemHeight}px`
      );
    }
  }
}
