import { Picker } from '@ysx-libs/mobile-picker';
import { genItems } from '../../../../util';

let columns = [genItems(16), genItems(7), genItems(2)];
let value: number[] = [];

export function run() {
  renderPickerViews();
  renderLabel();
  const pickerInstance = new Picker('.mobile-picker', {
    selectedIndexes: value,
    onChange(event) {
      // console.log('onChange>>>', event, trigger);
      value = event;
      renderLabel();
    },
    mouseWheel: true,
    clickToSelect: true
  });

  const refreshAllBtn = document.getElementById('refresh-all');
  if (refreshAllBtn) {
    refreshAllBtn.addEventListener('click', () => {
      columns = [genItems(9), genItems(7), genItems(11)];
      renderPickerViews();
      value = pickerInstance.refreshAll();
      // console.log('value>>>', value);
      renderLabel();
    });
  }

  const refreshTwoBtn = document.getElementById('refresh-two');
  if (refreshTwoBtn) {
    refreshTwoBtn.addEventListener('click', () => {
      columns[1] = genItems(7);
      renderPickerView(1);
      value = pickerInstance.refreshColumns([1]);
      // console.log('value>>>', value);
      renderLabel();
    });
  }

  const refreshTwoAndSelectBtn = document.getElementById('refresh-two-select');
  if (refreshTwoAndSelectBtn) {
    refreshTwoAndSelectBtn.addEventListener('click', () => {
      columns[1] = genItems(7);
      value[1] = 3;
      renderPickerView(1);
      value = pickerInstance.refreshColumns([1], value);
      // console.log('value >>>', value);
      renderLabel();
    });
  }

  function renderLabel() {
    const valueNode = document.querySelector('.demo-top .value span');
    if (valueNode) {
      const label = value.map((event, index) => columns[index][event]);
      valueNode.textContent = label.join('，');
    }
  }

  function renderPickerViews() {
    const pickerViewContainer = document.querySelector(
      '.mobile-picker .mobile-picker-view-container'
    );
    if (pickerViewContainer) {
      let pickerViewStr = '';
      columns.forEach((listItem) => {
        const itemStr = getListHtmlStr(listItem);
        pickerViewStr += `<div class="mobile-picker-view">
            <div class="mobile-picker-view-item-container">
              ${itemStr}
            </div>
          </div>`;
      });
      pickerViewContainer.innerHTML = pickerViewStr;
    }
  }

  function renderPickerView(index: number) {
    const pickerView = document.querySelector(
      `.mobile-picker .mobile-picker-view-container .mobile-picker-view:nth-child(${index + 1}) .mobile-picker-view-item-container`
    );
    if (pickerView) {
      let pickerViewStr = '';
      const itemStr = getListHtmlStr(columns[index]);
      pickerViewStr += itemStr;
      pickerView.innerHTML = pickerViewStr;
    }
  }

  function getListHtmlStr(list: string[]) {
    let str = '';
    list.forEach((item) => {
      str += `<div class="mobile-picker-view-item">${item}</div>`;
    });
    return str;
  }

}

