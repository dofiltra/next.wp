/* eslint-disable require-await */
import {
  GetStaticPaths,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next'

import { PostsArchive as ArchivesPage } from 'components/postsArchive/PostsArchive'
import { POSTS_PER_PAGE } from 'utils/constants'
import { PostsArchiveProps } from 'components/postsArchive/PostsArchive.types'
import { getGeneralSettings } from 'api/generalSettings'
import { getPosts } from 'api/posts'

export default ArchivesPage

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
})

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ page: string }>): Promise<
  GetStaticPropsResult<PostsArchiveProps>
> => {
  if (!params?.page) {
    return { notFound: true }
  }

  const {
    data: {
      generalSettings: { description = '', title = '' },
    },
  } = await getGeneralSettings()

  const page = parseInt(params.page)
  const {
    data: {
      posts: {
        edges,
        pageInfo: {
          offsetPagination: { total },
        },
      },
    },
  } = await getPosts(page, POSTS_PER_PAGE)
  const totalPages = Math.ceil(total / POSTS_PER_PAGE)

  return edges.length > 0
    ? {
        props: {
          posts: edges.map(({ node }) => node),
          pagination: { currentPage: page, totalPages, href: '/' },
          sitename: title,
          siteDescription: description,
          // categories: [],
        },
      }
    : { notFound: true }
}
