import { T, type Static } from '@/lib/schema'

export const MessageDto = T.Object({
  success: T.Boolean(),
  statusCode: T.Number(),
  message: T.String(),
})

export const ErrorDto = T.Object({
  ...MessageDto.properties,
  error: T.String(),
})

export interface MessageType extends Static<typeof MessageDto> {}
export interface ErrorType extends Static<typeof ErrorDto> {}
