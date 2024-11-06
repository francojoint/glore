export const Omit = <T, K extends keyof T>(
  Class: new () => T,
  ..._keys: K[]
): new () => Omit<T, (typeof _keys)[number]> => Class
