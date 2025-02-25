import { Picker } from '@ysx-libs/mobile-picker';

let selectedIndexes: number[] = [];

export function run() {
  const pickerInstance = new Picker('.mobile-picker', {
    selectedIndexes,
    onChange(event) {
      selectedIndexes = event;
      renderLabel();
    },
    clickToSelect: true,
  });
  renderLabel();
}

function renderLabel() {
  const valueNode = document.querySelector('.demo-card-top .value span');
  if (valueNode) {
    valueNode.textContent = selectedIndexes.join('，');
  }
}
