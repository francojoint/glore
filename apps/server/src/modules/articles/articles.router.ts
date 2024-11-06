import { wrap } from '@mikro-orm/core'

import { T } from '@lib/schema'
import type { App } from '.private/types'
import { verifyArticlePermissions, type Article } from '@/modules/articles'
import { getUserFromToken } from '@/modules/users'

export default async (app: App) => {
  app.get(
    '/',
    {
      schema: {
        querystring: T.Object({
          limit: T.Number({ default: 10 }),
          offset: T.Number({ default: 0 }),
        }),
        response: {
          200: T.Object({
            items: T.Array(T.Object({})),
            total: T.Number({}),
          }),
        },
      },
    },
    async ({ query }) => await app.db.article.listArticles({ ...query, cache: 5_000 }),
  )

  app.get(
    '/:slug',
    {
      schema: {
        params: T.Object({
          slug: T.String({}),
        }),
        response: {
          200: T.Object({}),
        },
      },
    },
    async request => {
      const { slug } = request.params

      return app.db.article.findOneOrFail(
        { slug },
        {
          populate: ['author', 'comments.author', 'text'],
        },
      )
    },
  )

  app.post('/:slug/comment', async (request, reply) => {
    const { slug, text } = request.params as { slug: string; text: string }
    const author = getUserFromToken(request, reply)
    const article = await app.db.article.findOneOrFail({ slug })
    const comment = app.db.comment.create({ author, article, text })

    article.comments.add(comment)

    await app.db.em.flush()

    return comment
  })

  app.post('/', async (request, reply) => {
    const { title, description, text } = request.body as { title: string; description: string; text: string }
    const author = getUserFromToken(request, reply)
    const article = app.db.article.create({
      title,
      description,
      text,
      author,
    })

    await app.db.em.flush()

    return article
  })

  app.patch('/:id', async (request, reply) => {
    const user = getUserFromToken(request, reply)
    const params = request.params as { id: string }
    const article = await app.db.article.findOneOrFail(+params.id)
    verifyArticlePermissions(user, article)
    wrap(article).assign(request.body as Article)
    await app.db.em.flush()

    return article
  })

  app.delete('/:id', async (request, reply) => {
    const user = getUserFromToken(request, reply)
    const params = request.params as { id: string }
    const article = await app.db.article.findOne(+params.id)

    if (!article) {
      return { notFound: true }
    }

    verifyArticlePermissions(user, article)
    await app.db.em.remove(article).flush()

    return { success: true }
  })
}
