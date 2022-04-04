/* eslint-disable require-await */
/* eslint-disable @typescript-eslint/ban-types */
import { Navbar } from 'components/navbar/Navbar'
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    const { sitename = '' } = { ...this.props?.__NEXT_DATA__?.props?.pageProps }

    return (
      <Html>
        <Head>
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
            crossOrigin="anonymous"
          />
        </Head>
        <body>
          <div className="container">
            <div className="row">
              <Navbar sitename={sitename} />
            </div>
            <div className="row">
              <Main />
            </div>
          </div>

          <NextScript />
          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
            crossOrigin="anonymous"
          ></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument
