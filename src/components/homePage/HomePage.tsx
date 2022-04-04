import { Pagination } from 'components/pagination/Pagination'
import { Post } from 'components/post/Post'

import { HomePageProps } from './HomePage.types'
import { Navbar } from 'components/navbar/Section'
import { getExcerptFromContent } from './HomePage.utils'
import styles from './HomePage.module.scss'

export const HomePage = ({ posts, pagination, sitename }: HomePageProps) => {
  return (
    <div className="container">
      <div className="row">
        <Navbar sitename={sitename} />
      </div>

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
}
