import {
  BeforeCreate,
  BeforeUpdate,
  Collection,
  Embeddable,
  Embedded,
  Entity,
  EntityRepositoryType,
  OneToMany,
  Property,
  type EventArgs,
} from '@mikro-orm/postgresql'

import { hash, verify } from 'argon2'

import { Article } from '@/db/entities/article'
import { BaseEntity } from '@/db/entities/base'
import { UserRepository } from '@/db/repositories/user'

@Embeddable()
export class Social {
  @Property()
  twitter?: string

  @Property()
  facebook?: string

  @Property()
  linkedin?: string
}

@Entity({ repository: () => UserRepository })
export class User extends BaseEntity<'bio'> {
  [EntityRepositoryType]?: UserRepository

  @Property()
  fullName: string

  @Property({ hidden: true })
  email: string

  @Property({ hidden: true, lazy: true })
  password: string

  @Property({ type: 'text' })
  bio = ''

  @OneToMany(() => Article, article => article.author, { hidden: true })
  articles = new Collection<Article>(this)

  @Property({ persist: false })
  token?: string

  @Embedded(() => Social, { object: true })
  social?: Social

  constructor(fullName: string, email: string, password: string) {
    super()
    this.fullName = fullName
    this.email = email
    this.password = password
  }

  @BeforeCreate()
  @BeforeUpdate()
  hashPassword = async (args: EventArgs<User>) => {
    const password = args.changeSet?.payload.password
    if (password) this.password = await hash(password)
  }
  verifyPassword = async (password: string) => verify(this.password, password)
}
