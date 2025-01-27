import { Picker, PickerDefScrollShape } from '@ysx-libs/mobile-picker';


let selectedIndexes: number[] = [];

export function run() {
  const pickerInstance = new Picker('.mobile-picker', {
    selectedIndexes,
    onChange(event) {
      selectedIndexes = event;
      renderLabel();
    },
    mouseWheel: true,
    scrollShape: 'scale' // 默认
  });


  const shapesRadio = document.getElementsByName('shape');
  shapesRadio.forEach((item) => {
    item.addEventListener('change', (event) => {
      const target = event.target as HTMLInputElement;
      pickerInstance.innerOptions.scrollShape = target.value as PickerDefScrollShape;
      pickerInstance.refreshAll();
    })
  });
  renderLabel();
}



function renderLabel() {
  const valueNode = document.querySelector('.demo-card-top .value span');
  if (valueNode) {
    valueNode.textContent = selectedIndexes.join('，');
  }
}




