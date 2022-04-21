import type { Data } from './types';

function omit <T extends Data, K extends string>(object: T, attrs: K[]): Omit<T,  K> {
  const result = { ...object };
  for (const item of attrs) {
    Reflect.deleteProperty(result, item);
  }
  return result;
};



function addOrDelete(checked: boolean): 'add' | 'delete' {
  return checked ? 'add' : 'delete';
}

export { omit, addOrDelete };
