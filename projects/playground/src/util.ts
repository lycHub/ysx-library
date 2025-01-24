import cryptoRandomString from 'crypto-random-string';
export function genItems(length: number) {
  return Array.from({ length }).map((_, index) => {
    const id = cryptoRandomString({ length: 8 });
    return `${id}-${index + 1}`;
  });
}

// export function fetchItems(): Promise<SelectOption[][]> {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve([genItems(16), genItems(5), genItems(2)]);
//     }, 1000);
//   });
// }
