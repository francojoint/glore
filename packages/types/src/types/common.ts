/**
 * Empty object interface.
 */
export interface EmptyObject {
  [key: string]: never
}

/**
 * Generic function interface.
 */
export interface Function {
  (...args: any[]): any
}

/**
 * Generic constructor interface for objects or arrays.
 */
export type ObjectOrArray<T = unknown> = Record<string, T> | T[]

/**
 * Type returning true when the argument is optional.
 */
export type IsOptional<T> = Extract<T, undefined> extends never ? false : true

/**
 * Type returning true when the argument is a function.
 */
export type IsFunction<T> = T extends Function ? true : false

/**
 * Type returning true when the argument is a value type.
 */
export type IsValueType<T> = T extends
  | string
  | number
  | boolean
  | null
  | undefined
  | Function
  | Set<any>
  | Map<any, any>
  | Date
  | Array<any>
  ? true
  : false
