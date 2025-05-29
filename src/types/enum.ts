export type Enum<T> = Record<string | number | symbol, T>;

export type EnumItem<T> = T extends Enum<infer U> ? U : never;
