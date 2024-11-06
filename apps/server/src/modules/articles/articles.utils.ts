import { type User } from '@/modules/user'

import { type Article } from '@/modules/articles'

export const verifyArticlePermissions = (user: User, article: Article) => {
  if (article.author.id === user.id) return
  throw new Error('You are not the author of this article!')
}
