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

  #initPickerView(value?: number[]) {
    if (value) {
      this.innerOptions.selectedIndexes = value;
    }
    const viewNodes = this.rootNode!.querySelectorAll('.mobile-picker-view');
    console.log('viewNodes :>> ', viewNodes);
    viewNodes.forEach((item, index) => {
      const viewInstance = new PickerView(item as HTMLElement, {
        ...this.innerOptions,
        selectedIndex: this.innerOptions.selectedIndexes[0],
        onChange: (event) => {
          this.#handleChange(event, index);
        },
      });
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

  #handleChange(event: number, index: number) {
    this.innerOptions.selectedIndexes[index] = event;
    this.innerOptions.onChange?.(this.innerOptions.selectedIndexes);
  }

  setIndexes(event: number[]) {
    this.innerOptions.selectedIndexes = event;
    const validIndexes: number[] = [];
    event.forEach((item, index) => {
      if (this.#pickerViewInstances[index]) {
        validIndexes.push(this.#pickerViewInstances[index].setIndex(item));
      }
    });
    return validIndexes;
  }

  refresh(event?: number[]) {
    this.#initPickerView(event);
    console.log('this.#pickerViewInstances :>> ', this.#pickerViewInstances);
  }
}
