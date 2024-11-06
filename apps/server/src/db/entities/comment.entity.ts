import { Entity, ManyToOne, Property, type Ref } from '@mikro-orm/postgresql'

import { Article } from '@/db/entities/article'
import { BaseEntity } from '@/db/entities/base'
import { User } from '@/db/entities/user'

@Entity()
export class Comment extends BaseEntity {
  @Property({ length: 1000 })
  text!: string

  @ManyToOne({ entity: () => Article })
  article!: Ref<Article>

  @ManyToOne({ entity: () => User })
  author!: Ref<User>
}
