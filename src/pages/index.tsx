/* eslint-disable require-await */
/* eslint-disable @typescript-eslint/ban-types */

import { GetStaticPropsContext } from 'next'
import { HomePage } from 'components/homePage/HomePage'
import { getStaticProps as getPostsArchiveStaticProps } from 'pages/page/[page]'

export default HomePage

export const getStaticProps = async (ctx: GetStaticPropsContext<{}>) =>
  getPostsArchiveStaticProps({ ...ctx, params: { page: '1', ...ctx.params } })
