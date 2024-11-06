import {
  Collection,
  Entity,
  EntityRepositoryType,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property,
  ref,
  t,
  type Ref,
  type Rel,
} from '@mikro-orm/postgresql'

import { BaseEntity } from '@/db/entities/base'
import { Comment } from '@/db/entities/comment'
import { Tag } from '@/db/entities/tag'
import { User } from '@/db/entities/user'
import { ArticleRepository } from '@/db/repositories/article'
import { toSlug } from '@/lib/utils'

@Entity({ repository: () => ArticleRepository })
export class Article extends BaseEntity<'slug'> {
  [EntityRepositoryType]?: ArticleRepository

  @Property({ unique: true })
  slug: string

  @Property({ index: true })
  title: string

  @Property({ length: 1000 })
  description: string

  @Property({ type: t.text, lazy: true })
  text: string

  @ManyToMany({ entity: () => Tag })
  tags = new Collection<Tag>(this)

  @ManyToOne({ entity: () => User })
  author: Ref<User>

  @OneToMany({ entity: () => Comment, mappedBy: 'article', eager: true, orphanRemoval: true })
  comments = new Collection<Comment>(this)

  constructor(author: Rel<User>, title: string, description = '', text = '') {
    super()
    this.author = ref(author)
    this.title = title
    this.description = description
    this.text = text
    this.slug = toSlug(title)
  }
}
