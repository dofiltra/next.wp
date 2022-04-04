import { Pagination } from 'components/pagination/Pagination'
import { Post } from 'components/post/Post'

import { PostsArchiveProps } from './PostsArchive.types'
import { getExcerptFromContent } from './PostsArchive.utils'
import styles from './PostsArchive.module.scss'

export const PostsArchive = ({ posts, pagination }: PostsArchiveProps) => (
  <div className="container">
    <div>
      {posts.map(({ content, ...post }) => (
        <Post
          key={post.id}
          post={{ ...post, content: getExcerptFromContent(content) }}
          isExcerpt
        />
      ))}
    </div>
    {pagination.totalPages > 1 && (
      <Pagination {...pagination} className={styles.pagination} />
    )}
  </div>
)
