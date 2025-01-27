export const isObject = (
  value: unknown,
): value is Record<string | number | symbol, unknown> =>
  value !== null && typeof value === 'object';

export function isPlainObject(
  value: unknown,
): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null) return false;

  // exclude: null、Array、Function、Date、RegExp ...
  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}

export const isFunction = (
  value: unknown,
): value is (...args: unknown[]) => boolean => typeof value === 'function';

export const isString = (value: unknown): value is string =>
  typeof value === 'string';
export const isBoolean = (value: unknown): value is boolean =>
  typeof value === 'boolean';
export const isNumber = (value: unknown): value is number =>
  typeof value === 'number';
export const isUndef = (value: unknown): value is undefined =>
  typeof value === 'undefined';
