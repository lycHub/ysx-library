type Data<T = any> = Record<string, T>;

type TypeWithUndefined<T> = T | undefined;
type TypeWithNull<T> = T | null;

export type { Data, TypeWithUndefined, TypeWithNull };