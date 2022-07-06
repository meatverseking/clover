import Head from 'next/head';

function Dash() {
  return (
    <>
      <Head>
        <title>Your Dashboard | ClearCloud</title>
        <meta name="description" content={`Cloud storage without limits`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}

export default Dash;