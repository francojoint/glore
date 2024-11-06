import { EntityRepository } from '@mikro-orm/postgresql'

import { type User } from '@/db/entities/user'
import { AuthError, verifyPassword } from '#core/utils'

export class UserRepository extends EntityRepository<User> {
  async exists(email: string) {
    const count = await this.qb().where({ email }).getCount()
    return count > 0
  }

  async login(email: string, password: string) {
    const err = new AuthError('Invalid combination of email and password')

    const user: User = await this.findOneOrFail(
      { email },
      {
        populate: ['*'],
        failHandler: () => err,
      },
    )

    if (await verifyPassword(password)) return user

    throw err
  }
}
