import { ChangeTrigger, PickerOptions, ValueOrNull } from './types';
import { DefaultOptions } from './consts';
import { PickerView } from './picker-view';

export class Picker {
  readonly rootNode: ValueOrNull<HTMLElement>;
  innerOptions: PickerOptions;
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
    this.#initPicker();
  }

  #initPicker(value?: number[]) {
    const viewNodes = this.rootNode!.querySelectorAll('.mobile-picker-view');
    this.innerOptions.selectedIndexes.length = viewNodes.length;
    viewNodes.forEach((item, index) => {
      const viewInstance = this.#initPickerView(item as HTMLElement, value || this.innerOptions.selectedIndexes, index);
      this.#pickerViewInstances.push(viewInstance);
    });

    this.innerOptions.selectedIndexes = this.#pickerViewInstances.map((item) => item.innerSelectedIndex);

    const itemHeight = this.#pickerViewInstances[0]?.metaInfo?.itemHeight || 0;
    if (itemHeight > 0) {
      this.rootNode!.style.setProperty(
        '--picker-item-height',
        `${itemHeight}px`
      );
    }
  }

  #initPickerView(node: HTMLElement, value: number[], index: number) {
    const viewInstance = new PickerView(node, {
      ...this.innerOptions,
      selectedIndex: value[index],
      onChange: (event, trigger) => {
        this.#handleChange(event, trigger, index);
      },
    });
    return viewInstance;
  }

  #handleChange(event: number, trigger: ChangeTrigger, index: number) {
    this.innerOptions.selectedIndexes[index] = event;
    this.innerOptions.onChange?.(this.innerOptions.selectedIndexes, trigger, index);
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

  /* refresh(value?: number[]) {
    this.#pickerViewInstances.forEach((item) => item.destroy());
    this.#pickerViewInstances = [];
    this.#initPicker(value);
    return this.innerOptions.selectedIndexes;
  } */

  refreshAll(value?: number[]) {
    const viewNodes = this.rootNode!.querySelectorAll('.mobile-picker-view');
    if (viewNodes.length) {
      this.innerOptions.selectedIndexes.length = viewNodes.length;
      this.#pickerViewInstances.forEach((item) => item.destroy());
      this.#pickerViewInstances.length = viewNodes.length;
      return this.refreshColumns(this.#pickerViewInstances.map((_, index) => index), value);
    }
    return this.#cleanup();
  }

  refreshColumns(indexes: number[], value?: number[]) {
    const viewNodes = this.rootNode!.querySelectorAll('.mobile-picker-view');
    if (viewNodes.length) {
      indexes.forEach((index) => {
        const viewNode = viewNodes[index] as HTMLElement;
        if (viewNode && this.#pickerViewInstances[index]) {
          this.#pickerViewInstances[index].destroy();
          this.#pickerViewInstances[index] = this.#initPickerView(viewNode, value || this.innerOptions.selectedIndexes, index);
        }
      });
      this.innerOptions.selectedIndexes = this.#pickerViewInstances.map((item) => item.innerSelectedIndex);
      return this.innerOptions.selectedIndexes;
    }
    return this.#cleanup();
  }

  #cleanup() {
    this.innerOptions.selectedIndexes = [];
    this.#pickerViewInstances.forEach((item) => item.destroy());
    this.#pickerViewInstances = [];
    return [];
  }
}
