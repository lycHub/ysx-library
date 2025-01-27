import { Picker } from '@ysx-libs/mobile-picker';
import { genItems } from '../../../../util';


let data = [genItems(16)];
let value: number[] = [];

export function run() {
  renderPickerViews();
  renderLabel();
  const pickerInstance = new Picker('.mobile-picker', {
    selectedIndexes: value,
    onChange(event) {
      console.log('onChange>>>', event);
      value = event;
      renderLabel();
    },
  });

  const refreshBtn = document.getElementById('refresh');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      refreshList();
    });
  }

  const refreshAndSelectBtn = document.getElementById('refresh-selected');
  if (refreshAndSelectBtn) {
    refreshAndSelectBtn.addEventListener('click', () => {
      refreshList([3]);
    });
  }

  function refreshList(event?: number[]) {
    data[0] = genItems(5);
    renderPickerViews();
    value = pickerInstance.refreshAll(event);
    renderLabel();
  }

  function renderLabel() {
    const valueNode = document.querySelector('.demo-card-top .value span');
    if (valueNode) {
      const label = value.map((event, index) => data[index][event]);
      valueNode.textContent = label.join('，');
    }
  }

  function renderPickerViews() {
    const pickerViewContainer = document.querySelector(
      '.mobile-picker .mobile-picker-view-container'
    );
    if (pickerViewContainer) {
      let pickerViewStr = '';
      data.forEach((listItem) => {
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

  function getListHtmlStr(list: string[]) {
    let str = '';
    list.forEach((item) => {
      str += `<div class="mobile-picker-view-item">${item}</div>`;
    });
    return str;
  }
}






