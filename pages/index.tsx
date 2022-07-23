import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image';
import logo from '../public/images/logo.png'
import styles from '../styles/Home.module.css'
import { BiX } from "react-icons/bi";
import axios from 'axios';
import { useMoralis } from 'react-moralis'
import { useState, useEffect, useContext } from 'react'
import { Alert, Button, Modal, Box, FormControl, TextField } from "@mui/material";
import Loader from '../app/components/loader';
const API_URL = process.env.MATIC_LINK;
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

import contract from "../artifacts/contracts/share.sol/simpleNFT.json";
import { makeNFTClient } from '../app/components/extras/storage/utoken';
import { GenContext } from '../app/components/extras/contexts/genContext';
const contractAddress = "0xf4744dA5fc8fb62689B23beAc572633Aed1280A3";
const abi:any = contract.abi;

const web3 = createAlchemyWeb3(API_URL || "");
const nftContract = new web3.eth.Contract(abi, contractAddress);


const Home: NextPage = () => {
  const {
    isAuthenticated,
    user,
    isInitialized,
    authenticate,
    logout,
    isWeb3Enabled,
    enableWeb3,
    chainId,
    Moralis
  } = useMoralis();

  const [isNotSupported, setSupport] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');
  const [open, setOpen] = useState<boolean>(true);
  const [isLoading, setLoading] = useState<boolean>(false);
  const handleClose = () => setOpen(false);
  const [failMessage, setFailMessage] = useState<string>('');
  const userData = useContext(GenContext);
  const { login: loginData } = userData;
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

  const [name, setName] = useState<string>('');
  const [contractAd, setContractAd] = useState<string>('');
  const [participants, setParticipants] = useState<string[]>([]);
  const [bigLoader, setBigLoader] = useState<boolean>(false);
  let nft:any = "";

  const generateNftData = async (name: string, owner: string) => {

    const nfx = makeNFTClient(
      await Moralis.Cloud.run("getNFTStorageKey")
      ); 

    const date = new Date();

    await fetch(
      "https://bafybeie7t55z2qadgqx75lcykacprn4pu6w5xphluozwwgbun6m4yxawry.ipfs.dweb.link/logolg.png"
    ).then(async (x) => {
      nft = await nfx.store({
        image: new File([await x.blob()], "clover.png", {
          type: "image/png",
        }),
        name,
        description: `Access to ${name} ${(name).toLowerCase().indexOf('dao') == -1 ? 'DAO' : ''}`,
        attributes: [
          {
            main: owner,
            created: Math.floor(date.getTime() / 1000),
          },
        ],
      });

    });
    return nft.url;
  };


  const mintNFT = async (tokenURI: string, receiver: string) => {
    const nonce = await web3.eth.getTransactionCount(
      process.env.PUBLIC_KEY || "",
      "latest"
    ); //get latest nonce

    //the transaction
    const tx = {
      from: process.env.PUBLIC_KEY,
      to: contractAddress,
      nonce: nonce,
      gas: 500000,
      data: nftContract.methods.mintTokens(receiver, tokenURI).encodeABI(),
    };

    const signPromise = web3.eth.accounts.signTransaction(
      tx,
      process.env.MATIC_PRIVATE_KEY || ""
    );
    signPromise
      .then((signedTx) => {
        web3.eth
          .sendSignedTransaction(signedTx.rawTransaction || "")
          .then((e) => {

              

          })
          .catch((ee) => {
            setLoading(false);
            setFailMessage(
              "Your contract address does not exist in your wallet"
            );
          });
      })
      .catch((err) => {
        setLoading(false);
        setFailMessage("Your contract address does not exist in your wallet");
      });
  };


  const sumitDeets = () => {
      setLoading(true)
      let send: boolean = false;
    authenticate({signingMessage: "Registering A DAO"}).then(async (userx) => {      
       if (!(supported.includes(chainId ? Number(chainId) : 80001))) {
          setSupport(true);  
          setFailMessage("Only Polygon Mumbai testnet is allowed for now")
          return;
       }

      if (!name.length) {
        setFailMessage("Name is required"); 
        setLoading(false);         
        return;
      }

      if(!contractAd.length){
          setFailMessage("A contract address is required if you dont have one leave as default");
          setLoading(false);
          return;
      }else if(((contractAd).toLowerCase()).trim() == 'default'){

      if (participants.length) {
          participants.forEach(async (v) => {

            const res = await axios.get(
              `https://api.covalenthq.com/v1/80001/address/${v}/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=false&key=ckey_d8fd93851d6a4d57bdcf14a337d`
            );

           const main = res.data;

           if(main.error){
            setLoading(false);
               setFailMessage(
                 `Error Retrieving data from ${v}, check the address and try again`
               );
              return;
           }
         })

      }
        send = true;
      }else{
           const res = await axios.get(
             `https://api.covalenthq.com/v1/80001/address/${userx?.get(
               "ethAddress"
             )}/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=false&key=ckey_d8fd93851d6a4d57bdcf14a337d`
           );

           const main = res.data;   
           let active = false;
            main.data.items.forEach((v:any) => {
                if (v["contract_address"] !== undefined) {
                    if(v['contract_address'] == contractAd){
                        active = true;
                    }
                }
            })

            if(!active){
                setLoading(false);
                setFailMessage("Your contract address does not exist in your wallet");
                return;
            }

            send = true;
      }

        const nftown: string[] = participants 
        const Dao = Moralis.Object.extend('DAOs');

        const dao = new Dao();
        dao.set("user", user);
        dao.set("contract", contractAd);
        dao.set("participants", JSON.stringify(participants));
        dao.set("userContract", user?.get("ethAddress"));
        dao.set("name", name);

        try{
          await dao.save();

          if(contractAd == 'default'){
            nftown.push(user?.get('ethAddress'))
            const metadata = await generateNftData(name, user?.get('ethAddress'));
            
            nftown.forEach(async (address:string, i:number) => {

              await mintNFT(metadata, address);

            })
            if (loginData?.update !== undefined) {
              loginData?.update([name, contractAd, { participants: nftown }]);
            }
          }else{
            if(loginData?.update !== undefined){
            loginData?.update([name, contractAd, {}]);
          }
        }


          window.location.href = '/dashboard';

        } catch (err) {
            setLoading(false);
            console.log(err)
            setFailMessage("Something went wrong, please try again");
        }

       }).catch(err => {
        console.log(err)
        setLoading(false);
          setFailMessage("Something went wrong, please try again")
       })

  }


  
  const login = async () => {
    setLoginError('');
    setBigLoader(true)
    if (!isAuthenticated) {
      setSupport(false)
      await authenticate({ signingMessage: "Welcome to Clover" })
        .then(async function (user) {
          if (supported.includes(chainId ? Number(chainId) : 80001)) {

             const res = await axios.get(
               `https://api.covalenthq.com/v1/80001/address/${user?.get('ethAddress')}/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=false&key=ckey_d8fd93851d6a4d57bdcf14a337d`
             );
              
             const main = res.data.data.items;

             if(!res.data.error){
                let exec = [];
                main.forEach(async (v:any) => {
                  
                  const clx = ''
                
                  if (contractAddress == ((v.contract_address).toLowerCase()).trim()) {
                      
                  }
                  const DAO = Moralis.Object.extend('DAOs');

                  const mQ = new Moralis.Query(DAO);

                  mQ.equalTo("contract", v.contract_address);

                  const ld = await mQ.find();

                  if(ld.length){

                  }

                })

             }else{
                setBigLoader(false);
                setSupport(false);
                setLoginError("No registered DAO found");
             }

            window.location.href='/dashboard'


          } else {
            setSupport(true);
            setBigLoader(false)
            throw 'Only Mumbai testnet network is supported';
          }
        })
        .catch(function (error) {
          setBigLoader(false);
          setLoginError(error);
        });
    }
  };

  return (
    <>
      {bigLoader && <Loader />}

      {!bigLoader && (
        <div className={styles.container}>
          <Head>
            <title>Clover</title>
            <meta name="description" content="Chat as a DAO" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Modal open={open} onClose={handleClose}>
            <div className="w-screen absolute h-screen flex items-center bg-[#ffffffb0]">
              <div className="2usm:px-0 mx-auto max-w-[900px] 2usm:w-full relative w-[85%] usm:m-auto min-w-[340px] px-6 my-8 items-center">
                {isLoading && (
                  <Loader
                    sx={{
                      backgroundColor: "rgba(255,255,255,.6)",
                      backdropFilter: "blur(5px)",
                    }}
                    fixed={false}
                    incLogo={false}
                  />
                )}

                <div className="rounded-lg bg-white shadow-lg shadow-[#cccccc]">
                  <div className="border-b flex justify-between py-[14px] px-[17px] text-xl font-bold">
                    Register DAO
                    <BiX size={16} />
                  </div>
                  <div className="form relative pt-4">
                    <Box sx={{ width: "100%" }}>
                      {Boolean(failMessage.length) && (
                        <div className="rounded-md w-[95%] font-bold mt-2 mx-auto p-3 bg-[#ff8f33] text-white">
                          {failMessage}
                        </div>
                      )}

                      <FormControl
                        fullWidth
                        sx={{
                          px: 5,
                          py: 3,
                        }}
                      >
                        <div>
                          <TextField
                            fullWidth
                            id="outlined-basic"
                            label="Name of DAO"
                            variant="outlined"
                            value={name}
                            onChange={(
                              e: React.ChangeEvent<
                                HTMLInputElement | HTMLTextAreaElement
                              >
                            ) => {
                              setName(e.target.value);
                            }}
                          />
                        </div>
                        <div className="my-3">
                          <TextField
                            fullWidth
                            id="outlined-basic"
                            label="Contract Address"
                            variant="outlined"
                            helperText="Contract address of the token that would allow users into the DAO - use `default` if you want one generated by us"
                            value={contractAd}
                            onChange={(
                              e: React.ChangeEvent<
                                HTMLInputElement | HTMLTextAreaElement
                              >
                            ) => {
                              setContractAd(e.target.value);
                            }}
                          />
                        </div>

                        {contractAd.toLowerCase().trim() == "default" && (
                          <>
                            <div className="py-3 font-bold">Participants</div>
                            <div className="flex w-full items-center">
                              {participants.map((e, i: number) => (
                                <div
                                  className="border text-[#777] border-solid ml-[2px] rounded p-2"
                                  key={i}
                                >
                                  {e.substring(0, 5) +
                                    "...." +
                                    e.substring(e.length - 5, e.length)}
                                </div>
                              ))}
                            </div>

                            <TextField
                              fullWidth
                              id="outlined-basic"
                              helperText="if left empty only you would have access to your , Polygon mumbai addresses only"
                              variant="outlined"
                              value={""}
                              placeholder="click enter to add address"
                              onKeyUp={(e: any) => {
                                if (e.keyCode == 13 || e.which === 13) {
                                  if (e.target.value.length) {
                                    const part: string[] = participants;
                                    part.push(e.target.value);

                                    setParticipants(part);
                                  }
                                }
                              }}
                              onBlur={(e: any) => {
                                if (e.target.value.length) {
                                  const part: string[] = participants;
                                  part.push(e.target.value);

                                  setParticipants(part);
                                }
                              }}
                            />
                          </>
                        )}

                        <Button
                          variant="contained"
                          className="!bg-[#1891fe] !mt-4 !py-[13px] !font-medium !capitalize"
                          style={{
                            fontFamily: "inherit",
                          }}
                          onClick={() => {
                            setFailMessage("");
                            sumitDeets();
                          }}
                          fullWidth
                        >
                          Create
                        </Button>
                      </FormControl>
                    </Box>
                  </div>
                </div>
              </div>
            </div>
          </Modal>

          <div className="h-screen flex flex-col justify-center">
            {Boolean(loginError.length) && (
              <Alert className="my-2" severity="error">
                {loginError}
              </Alert>
            )}
            <div className="flex justify-around">
              <div className="items-center mt-4 top-0 absolute flex justify-center">
                <Image src={logo} alt="Clover" width={150} height={49.995} />
              </div>
              <div className="self-center">
                <Button
                  onClick={login}
                  style={{
                    fontFamily: "Poppins",
                  }}
                  className="!py-4 !px-8 rounded-lg !capitalize !font-semibold !text-xl !text-white !bg-[#1891fe]"
                >
                  Authenticate
                </Button>
              </div>
              <div className="self-center">
                <Button
                  onClick={login}
                  style={{
                    fontFamily: "Poppins",
                  }}
                  className="!py-4 !px-8 rounded-lg !capitalize !font-semibold !text-xl !text-white !bg-[#1891fe]"
                >
                  Register DAO
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home
