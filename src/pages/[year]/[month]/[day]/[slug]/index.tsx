import { GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Head from 'next/head'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'

import { POSTS_PER_PAGE } from 'utils/constants'
import { Post } from 'components/post/Post'
import { Post as PostPageProps } from 'api/posts.types'
import { getPostById, getPostBySlug, getPosts } from 'api/posts'
import { usePreviewModeExit } from 'hooks/usePreviewModeExit'

const PostPage = (post: PostPageProps) => {
  usePreviewModeExit()

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Post post={post} isExcerpt={false} />
    </>
  )
}

export default PostPage

interface Params extends ParsedUrlQuery {
  year: string
  month: string
  day: string
  slug: string
}

type PreviewData = {
  id: number
  headers: { 'X-WP-Nonce': string; Cookie: string }
}

export const getStaticProps: GetStaticProps<
  PostPageProps,
  Params,
  PreviewData
> = async (ctx) => {
  if (ctx.preview && ctx.previewData) {
    const { id, headers } = ctx.previewData

    const {
      data: { post: post },
    } = await getPostById(id, { headers })

    return { props: post }
  }

  if (!ctx.params || !ctx.params.slug) {
    return { notFound: true }
  }

  const {
    data: { post: props },
  } = await getPostBySlug(ctx.params.slug)

  return { props }
}

export async function getStaticPaths() {
  const {
    data: {
      posts: { edges },
    },
  } = await getPosts(1, POSTS_PER_PAGE)

  return {
    paths: edges.map(({ node: { date, slug } }) => ({
      params: {
        year: format(parseISO(date), 'yyyy'),
        month: format(parseISO(date), 'MM'),
        day: format(parseISO(date), 'dd'),
        slug,
      },
    })),
    fallback: 'blocking',
  }
}
