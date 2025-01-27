import { Picker, PickerDefScrollShape } from '@ysx-libs/mobile-picker';


let selectedIndexes: number[] = [3];
export function run() {
  const pickerInstance = new Picker('.mobile-picker', {
    selectedIndexes,
    onChange(event) {
      selectedIndexes = event;
      renderLabel();
    },
    mouseWheel: true
  });

  const formNode = document.getElementById('form');
  if (formNode) {
    formNode.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = formNode.querySelector('input[name="value"]') as HTMLInputElement;
      if (input) {
        const value = Number(input.value);
        if (!Number.isNaN(value)) {
          selectedIndexes[0] = value;
          renderLabel();
          pickerInstance.setIndexes(selectedIndexes);
        }
      }

    });
  }
  renderLabel();
}


function renderLabel() {
  const valueNode = document.querySelector('.demo-card-top .value span');
  if (valueNode) {
    valueNode.textContent = selectedIndexes.join('，');
  }
}

