import './style.scss';
import { Picker } from '@ysx-libs/mobile-picker';
import { genItems } from './util';

let data = [genItems(16)];
let value: number[] = [];

renderPickerViews();
renderLabel();
bindActs();
const pickerInstance = new Picker('#mobile-picker', {
  selectedIndexes: value,
  onChange(event) {
    console.log('onChange>>>', event);
    value = event;
    renderLabel();
  },
});

function bindActs() {
  const changeIndexBtn = document.getElementById('change-index');
  if (changeIndexBtn) {
    changeIndexBtn.addEventListener('click', changeIndexes);
  }
  const changeListBtn = document.getElementById('change-list');
  if (changeListBtn) {
    changeListBtn.addEventListener('click', changeList);
  }
}

function changeIndexes() {
  value = [2];

  value = pickerInstance.setIndexes(value);
  renderLabel();
}

function changeList() {
  data = [genItems(5)];
  renderPickerViews();

  pickerInstance.refresh();
  // renderLabel();
}

function renderLabel() {
  const valueNode = document.querySelector('.act-box .value span');
  if (valueNode) {
    const label = value.map((event, index) => data[index][event]);
    valueNode.textContent = label.join('，');
  }
}

function renderPickerViews() {
  const pickerViewContainer = document.querySelector(
    '#mobile-picker .mobile-picker-view-container'
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
