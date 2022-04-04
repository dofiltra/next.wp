/* eslint-disable @typescript-eslint/ban-types */
import '../styles/style.scss'
import { AppProps } from 'next/app'
import { Layout } from 'components/layout/Layout'

export const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
