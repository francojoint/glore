/**
 * Server request interface.
 */
export interface ServerRequest {
  headers: Record<string, string>
  body: Record<string, string>
}

/**
 * Server response interface.
 */
export interface ServerResponse<TData, TError extends Error = Error> {
  success: boolean
  data?: TData
  message?: string
  error?: TError
}
