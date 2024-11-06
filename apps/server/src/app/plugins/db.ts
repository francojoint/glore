import { MikroORM, type EntityManager, type EntityRepository, type Options } from '@mikro-orm/postgresql'

import { Article } from '@/db/entities/article'
import { Comment } from '@/db/entities/comment'
import { Tag } from '@/db/entities/tag'
import { User } from '@/db/entities/user'
import { type ArticleRepository } from '@/db/repositories/article'
import { type UserRepository } from '@/db/repositories/user'
import plugin from '@/lib/plugin'

declare module 'fastify' {
  export interface FastifyInstance {
    db: DB
  }
}

/**
 * Options for the `db` plugin.
 */
export interface FastifyDBOptions extends Options {}

/**
 * Database instance.
 *
 * @see {@link https://mikro-orm.io}
 */
export interface DB {
  orm: MikroORM
  em: EntityManager
  comment: EntityRepository<Comment>
  tag: EntityRepository<Tag>
  user: UserRepository
  article: ArticleRepository
}

let cache: DB

const initDB = async (options: FastifyDBOptions): Promise<DB> => {
  if (cache) return cache

  const orm = await MikroORM.init(options)

  return (cache = {
    orm,
    em: orm.em,
    article: orm.em.getRepository(Article),
    comment: orm.em.getRepository(Comment),
    user: orm.em.getRepository(User),
    tag: orm.em.getRepository(Tag),
  })
}

/**
 * Fastify plugin to initialize and inject a MikroORM instance.
 *
 * @see {@link https://mikro-orm.io}
 */
export default plugin<FastifyDBOptions>(
  async (fastify, options) => {
    const db = await initDB(options)

    fastify.decorate('db', db)
    fastify.addHook('onClose', (_, done) => {
      db.orm.close().finally(done)
    })
  },
  { name: 'db' },
)
