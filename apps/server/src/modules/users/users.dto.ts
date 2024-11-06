import { T, type Static } from '@lib/schema'

export const UserAuthDto = T.Object({
  email: T.String(),
  password: T.String(),
})

export const UserSignupDto = T.Object({
  fullName: T.String(),
  ...UserAuthDto.properties,
})

export const UserPublicDto = T.Object({
  id: T.Number(),
  fullName: T.String(),
  email: T.String(),
  bio: T.String(),
  social: T.Object({
    twitter: T.String(),
    facebook: T.String(),
    linkedin: T.String(),
  }),
})

export const UserDto = T.Object({
  ...UserPublicDto.properties,
  token: T.String(),
})

export interface StaticUser extends Static<typeof UserDto> {}
