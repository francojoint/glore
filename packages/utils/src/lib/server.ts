import type { ServerResponse } from '@repo/types'

/**
 * Create a successful server response.
 *
 * @param message - The message to send.
 * @param data - The data to send.
 * @returns The server response.
 */
export const success = <T>(data?: T, message?: string): ServerResponse<T> => ({
  success: true,
  ...(data !== undefined && { data }),
  ...(message && { message }),
})

/**
 * Create a failed server response.
 *
 * @param message - The message to send.
 * @param error - The error to send.
 * @returns The server response.
 */
export const failure = <T, K extends Error>(message?: string, error?: K): ServerResponse<T, K> => ({
  success: false,
  message,
  ...(error && { error }),
})
