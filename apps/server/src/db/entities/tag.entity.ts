import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/postgresql'

import { Article } from '@/db/entities/article'
import { BaseEntity } from '@/db/entities/base'

@Entity()
export class Tag extends BaseEntity {
  @Property({ length: 20 })
  name!: string

  @ManyToMany({ entity: () => Article, mappedBy: 'tags' })
  articles = new Collection<Article>(this)
}
