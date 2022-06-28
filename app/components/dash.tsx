import Head from 'next/head';
function Dashboard() {
  return (
    <>
      <Head>
        <title>Your Dashboard | ClearCloud</title>
        <meta name="description" content={`Cloud storage without limits`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full">
        <div className="w-[300px] bg-gray-500">

        </div>
        <div className="bg-white"></div>
      </div>
    </>
  )
}

export default Dashboard;