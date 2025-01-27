import cryptoRandomString from 'crypto-random-string';
export function genItems(length: number) {
  return Array.from({ length }).map((_, index) => {
    const id = cryptoRandomString({ length: 8 });
    return `${id}-${index + 1}`;
  });
}