import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useMoralis } from 'react-moralis'
import { useState, useEffect } from 'react'

const Home: NextPage = () => {
  const {
    isAuthenticated,
    user,
    isInitialized,
    authenticate,
    logout,
    isWeb3Enabled,
    enableWeb3,
    chainId
  } = useMoralis();

  const [isNotSupported, setSupport] = useState<Boolean>(false);
  const [loginError, setLoginError] = useState<String>('');

  useEffect(() => {
    if (!isWeb3Enabled) {
      enableWeb3();
    }

    if (isAuthenticated) {

      console.log("Logged in user:", user!.get("ethAddress"));

      if (isNotSupported) {
        logout();
      }

    } else {
      console.log("Not logged in");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled, enableWeb3, isNotSupported]);

  console.log(Number(chainId));

  const supported = [80001];

  const logOut = async () => {
    if (isAuthenticated) {
      logout()
    }
  };

  const login = async () => {
    setLoginError('');
    if (!isAuthenticated) {
      setSupport(false)
      await authenticate({ signingMessage: "Welcome to Clover" })
        .then(function (user) {
          if (supported.includes(chainId ? Number(chainId) : 80001)) {

            window.location.href='/dashboard'
          } else {
            setSupport(true);
            throw 'Only Mumbai testnet network is supported';
          }
        })
        .catch(function (error) {
          setLoginError(error);
        });
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Clover</title>
        <meta name="description" content="Chat as a DAO" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div className="h-screen w-screen flex justify-center">
          <div className='self-center'>
            <button onClick={login} className='py-4 px-8 rounded-lg font-semibold text-xl text-white bg-purple-400'>Authenticate</button>
          </div>
        </div>
      </div>     
    </div>
  )
}

export default Home
