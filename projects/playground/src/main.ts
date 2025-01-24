import './style.scss';
import { Picker } from '@ysx-libs/mobile-picker';
import { genItems } from './util';

let options = genItems(16);
let value: number[] = [];

renderList();
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
  value = [20];

  value = pickerInstance.setIndexes(value);
  renderLabel();
}

function changeList() {
  options = genItems(5);
  renderList();

  value = pickerInstance.refresh();
  renderLabel();
}

function renderLabel() {
  const valueNode = document.querySelector('.act-box .value span');
  if (valueNode) {
    const label = value.map((event) => options[event]);
    valueNode.textContent = label.join('，');
  }
}

function renderList() {
  const itemContainer = document.querySelector(
    '#mobile-picker .mobile-picker-view-item-container'
  );
  if (itemContainer) {
    let childrenStr = '';
    options.forEach((item) => {
      childrenStr += `<div class="mobile-picker-view-item">${item}</div>`;
    });
    itemContainer.innerHTML = childrenStr;
  }
}
