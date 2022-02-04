import Head from 'next/head'

const HeadTag = () => {
  return <Head>
    <meta name='viewport' content='initial-scale=1.0, width = device-width'></meta>
    <meta charSet ='UTF-8'></meta>

    <link rel='icon' href='/favicon.ico' sizes='16*16' type='image/png'></link>

    <link rel="stylesheet" href="/listMessages.css" type='text/css' />
    <link rel="stylesheet" href="/styles.css" />
    <link rel="stylesheet" href="/nprogress.css" />

    <title>social media app</title>
  </Head>
};

export default HeadTag;
