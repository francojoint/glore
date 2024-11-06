import { Entity, EntityManager, Property } from '@mikro-orm/postgresql'

import { Article } from '@/db/entities/article'

@Entity({
  expression: (em: EntityManager) => em.getRepository(Article).listArticlesQuery(),
})
export class ArticleListing {
  @Property()
  slug!: string

  @Property()
  title!: string

  @Property()
  description!: string

  @Property()
  tags!: string[]

  @Property()
  author!: number

  @Property()
  authorName!: string

  @Property()
  totalComments!: number
}
