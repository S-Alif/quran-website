import Head from 'next/head'

const HtmlHead = ({pageTitle, pageDesc}) => {
  return (
    <Head>
      <meta name="description" content={pageDesc ? pageDesc : "Qur'An Web, a place where everyone can read and listen to Qur'An"} />
      <link rel="icon" href="../public/images/QuranApp-logo-green.png" />
      <title>{pageTitle ? pageTitle : "Qur'An Web"}</title>
    </Head>
  )
}

export default HtmlHead