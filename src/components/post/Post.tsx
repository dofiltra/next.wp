import { Element } from 'domhandler/lib/node'
import { Fragment } from 'react'
import { enUS } from 'date-fns/locale'
import Link from 'next/link'
import format from 'date-fns/format'
import parseHTML, { HTMLReactParserOptions } from 'html-react-parser'
import parseISO from 'date-fns/parseISO'

import { Avatar } from './avatar/Avatar'
import { Category } from './category/Category'

import { PostProps } from './Post.types'
import styles from './Post.module.scss'

export const Post = ({
  post: {
    author: { node: author },
    date,
    content,
    slug,
    title,
    categories: { edges: categories },
  },
  isExcerpt,
}: PostProps) => {
  const currentPostHref = `/${slug}/`
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.attribs.class === 'read-more') {
        return (
          <div className={styles.readMore}>
            <Link href={currentPostHref}>
              <a>{'>>>'}</a>
            </Link>
          </div>
        )
      }
    },
  }

  return (
    <article className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.categories}>
          {categories.map(({ node }, index) => (
            <Fragment key={node.slug}>
              <Category {...node} />
              {index !== categories.length - 1 && ', '}
            </Fragment>
          ))}
        </div>
        {isExcerpt ? (
          <h2 className={styles.title}>
            <Link href={currentPostHref}>
              <a>{title}</a>
            </Link>
          </h2>
        ) : (
          <h1 className={styles.title}>{title}</h1>
        )}
        <span className={styles.date}>
          {format(parseISO(date), 'do MMMM yyyy', { locale: enUS })}
        </span>
      </header>
      <div className="container">
        <div className="row">
          <div className={`col ${styles.content}`}>
            {parseHTML(content, options)}
          </div>
        </div>
      </div>
      <footer className={styles.footer}>
        <Avatar {...author} />
      </footer>
    </article>
  )
}
