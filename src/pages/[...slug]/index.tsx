/* eslint-disable require-await */
import { Element } from 'domhandler/lib/node'
import { GetStaticPaths, GetStaticProps } from 'next'
import { HTMLReactParserOptions, domToReact } from 'html-react-parser'
import { ParsedUrlQuery } from 'querystring'
import Head from 'next/head'
import Image from 'next/image'

import { MAX_PAGINATION_SIZE } from 'utils/constants'
import { Post } from 'api/posts.types'
import { Post as PostPage } from 'components/post/Post'
import { getPageBySlug, getPages } from 'api/pages'
import { getPostById, getPostBySlug, getPosts } from 'api/posts'
import { usePreviewModeExit } from 'hooks/usePreviewModeExit'

type PageProps = Pick<Post, 'title' | 'slug' | 'content'>

const figureParserOptions: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element && domNode.name === 'a') {
      const [image] = domNode.children
      const { alt, width, height } = (image as Element).attribs

      return (
        <Image
          src={domNode.attribs.href}
          alt={alt}
          width={width}
          height={height}
        />
      )
    }
  },
}

const Page = (page: PageProps) => {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (
        domNode instanceof Element &&
        domNode.name === 'figure' &&
        domNode.attribs.class.includes('wp-block-image')
      ) {
        return (
          <figure>{domToReact(domNode.children, figureParserOptions)}</figure>
        )
      }
    },
  }

  usePreviewModeExit()

  return (
    <>
      <Head>
        <title>{page.title}</title>
      </Head>
      <PostPage post={page as Post} isExcerpt={false} />
    </>
  )
}

export default Page

interface Params extends ParsedUrlQuery {
  slug: string[]
}

type PreviewData = {
  id: number
  headers: { 'X-WP-Nonce': string; Cookie: string }
}

export const getStaticProps: GetStaticProps<
  PageProps,
  Params,
  PreviewData
> = async (ctx) => {
  if (ctx.preview && ctx.previewData) {
    const { id, headers } = ctx.previewData

    const {
      data: { post: page },
    } = await getPostById(id, { headers })

    return { props: page }
  }

  const slug = ctx.params?.slug?.join('/') || ''

  if (!slug) {
    return { notFound: true }
  }

  const {
    data: { pageBy },
  } = await getPageBySlug(slug)

  if (pageBy) {
    return { props: pageBy }
  }

  const {
    data: { post },
  } = await getPostBySlug(slug)

  return { props: post }
}

async function getAllPages(): Promise<{ slug: string }[]> {
  async function getAllPagesWithAcc(
    page: number,
    acc: Promise<{ slug: string }[]>
  ): Promise<{ slug: string }[]> {
    const {
      data: {
        pages: {
          edges,
          pageInfo: {
            offsetPagination: { total },
          },
        },
      },
    } = await getPages(page, MAX_PAGINATION_SIZE)

    const totalPages = Math.ceil(total / MAX_PAGINATION_SIZE)
    const posts = [
      ...(await acc),
      ...edges.map(({ node: { slug } }) => ({ slug })),
    ]
    return page === totalPages
      ? posts
      : getAllPagesWithAcc(page + 1, Promise.resolve(posts))
  }
  return getAllPagesWithAcc(1, Promise.resolve([]))
}

async function getAllPosts(): Promise<{ slug: string }[]> {
  async function getAllPagesWithAcc(
    pageNum: number,
    acc: Promise<{ slug: string }[]>
  ): Promise<{ slug: string }[]> {
    const {
      data: {
        posts: {
          edges,
          pageInfo: {
            offsetPagination: { total },
          },
        },
      },
    } = await getPosts(pageNum, MAX_PAGINATION_SIZE)

    const totalPages = Math.ceil(total / MAX_PAGINATION_SIZE)
    const posts = [
      ...(await acc),
      ...edges.map(({ node: { slug } }) => ({ slug })),
    ]
    return pageNum === totalPages
      ? posts
      : getAllPagesWithAcc(pageNum + 1, Promise.resolve(posts))
  }
  return getAllPagesWithAcc(1, Promise.resolve([]))
}

export const getStaticPaths: GetStaticPaths = async () => {
  //const pages = (await getAllPages()) || []
  const posts = (await getAllPosts()) || []

  return {
    paths: [
      //...pages,
      ...posts,
    ].map(({ slug }) => ({
      params: { slug: slug.split('/') },
    })),
    fallback: false,
  }
}
