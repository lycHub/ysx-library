import type { Data } from './types';

export  function omit <T extends Data, K extends string>(object: T, attrs: K[]): Omit<T,  K> {
  const result = { ...object };
  for (const item of attrs) {
    Reflect.deleteProperty(result, item);
  }
  return result;
};
