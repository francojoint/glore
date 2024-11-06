/**
 * Throw an error.
 */
export const throwError = <T extends Error | null>(error: T) => {
  throw error
}
