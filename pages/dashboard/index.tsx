import { Web3Storage } from "web3.storage";
import Link from 'next/link';
import {
  LinearProgress,
  Button,Paper, InputBase, IconButton
} from "@mui/material"

import {
  AiOutlineFilePdf,
  AiOutlineFileUnknown,
  AiOutlineFileImage,
} from "react-icons/ai";
import user from '../../public/images/user.png';
import Image from 'next/image'

import Head from 'next/head';

import { FaRegFolderOpen, FaPlus, FaFolder, FaTrash, FaRegClock } from 'react-icons/fa'
import { BsCloudy, BsGrid3X3Gap, BsList } from "react-icons/bs";
import { TbSearch, TbUsers } from 'react-icons/tb'
import Folder from "../../app/components/folder";
import Pinned from "../../app/components/pinned";


// const makeStorageClient = async () => {
//   // return new Web3Storage({
//   //   token: ''
//   // });
// };

// const beginUpload = async (files: FileList) => {
//   const { size: totalSize } = files[0];

//   const onRootCidReady = (cid: string) => { };

//   let uploaded = 0;

//   const onStoredChunk = (size: number) => {
//     uploaded += size;

//     const pct = (totalSize / uploaded) * 100;

//     console.log(`Uploading... ${pct.toFixed(2)}% complete`);
//   };

//   const client = await makeStorageClient();

//   // return client.put(files, { onRootCidReady, onStoredChunk });
// };

const Dashboard = () => {
  //     const sendStuff = (files:FileList) => {

  //         const blobFiles = [];

  //         for(let i:number = 0;i<files.length; i++) {

  //         let startPointer = 0;
  //         let endPointer = files[i].size;
  //         let chunks = [];
  //         while(startPointer<endPointer){
  //             let newStartPointer = startPointer+(files[i].size/2);
  //             chunks.push(files[i].slice(startPointer,newStartPointer));
  //             startPointer = newStartPointer;
  //         }

  //          blobFiles.push(new Blob(chunks, { type: files[i].type }));
  //     }

  // }

  return (
    <>
      <Head>
        <title>user | Dashboard</title>
      </Head>
      <div
        onDragOver={(event) => {
          event.stopPropagation();
          event.preventDefault();
          event.dataTransfer.dropEffect = "copy";
        }}
        onDrop={(event) => {
          event.stopPropagation();
          event.preventDefault();
          const fileList = event.dataTransfer.files;
          //  sendStuff(fileList)
        }}
        className="w-full flex items-start justify-between filedrop min-h-screen"
      >
        <div className="h-full bg-[#f5F5F5] sidebar fixed min-w-[236px] w-[236px]">
          <div className="mt-3 mb-5">
            <Link href="/">
              <div className="text-[#1890FF] flex pl-4 items-center font-bold text-[18px]">
                <FaFolder size={25} className="mr-5 flex" color={"#1890FF"} />
                ClearCloud
              </div>
            </Link>
          </div>

          <div className="flex flex-col h-full">
            <div className="cusscroller h-[calc(100% - 1.25rem - 0.75rem - 27px)] overflow-y-scroll overflow-x-hidden">
              <div className="mb-2">
                <span className="pl-4 font-[500] mb-3 block text-[#595959]">
                  Drive Storage
                </span>

                <div className="flex pl-4 text-[14px] border-r-transparent items-center text-[rgba(0,0,0,0.45)]  hover:text-[#262626] py-2 cursor-pointer transition-all delay-500 hover:bg-[#bfbfbfe1] hover:border-r-[#5F5F5F] border-r-solid border-r-2 ">
                  <FaRegFolderOpen className="mr-2" size={20} /> My Drive
                </div>

                <div className="flex pl-4 text-[14px] border-r-transparent items-center text-[rgba(0,0,0,0.45)]  hover:text-[#262626] py-2 cursor-pointer transition-all delay-500 hover:bg-[#bfbfbfe1] hover:border-r-[#5F5F5F] border-r-solid border-r-2 ">
                  <TbUsers className="mr-2" size={20} /> Shared with me
                </div>
              </div>

              <div className="mb-2">
                <span className="pl-4 font-[500] text-[14px] mb-3 block text-[#595959]">
                  Tags
                </span>

                <div className="flex pl-4 text-[14px] border-r-transparent items-center text-[rgba(0,0,0,0.45)]  hover:text-[#262626] py-2 cursor-pointer transition-all delay-500 hover:bg-[#bfbfbfe1] hover:border-r-[#5F5F5F] border-r-solid border-r-2 ">
                  <div className="h-[14px] w-[14px] mr-2 rounded-[50%] bg-[#FF4D4F]"></div>{" "}
                  Red
                </div>

                <div className="flex pl-4 text-[14px] border-r-transparent items-center text-[rgba(0,0,0,0.45)]  hover:text-[#262626] py-2 cursor-pointer transition-all delay-500 hover:bg-[#bfbfbfe1] hover:border-r-[#5F5F5F] border-r-solid border-r-2 ">
                  <div className="h-[14px] w-[14px] mr-2 rounded-[50%] bg-[#FADB14]"></div>{" "}
                  Yellow
                </div>

                <div className="flex pl-4 text-[14px] border-r-transparent items-center text-[rgba(0,0,0,0.45)]  hover:text-[#262626] py-2 cursor-pointer transition-all delay-500 hover:bg-[#bfbfbfe1] hover:border-r-[#5F5F5F] border-r-solid border-r-2 ">
                  <div className="h-[14px] w-[14px] mr-2 rounded-[50%] bg-[#40A9FF]"></div>{" "}
                  Blue
                </div>

                <div className="flex pl-4 text-[14px] border-r-transparent items-center text-[rgba(0,0,0,0.45)]  hover:text-[#262626] py-2 cursor-pointer transition-all delay-500 hover:bg-[#bfbfbfe1] hover:border-r-[#5F5F5F] border-r-solid border-r-2 ">
                  <div className="h-[14px] w-[14px] mr-2 rounded-[50%] bg-[#52C41A]"></div>{" "}
                  Green
                </div>

                <div className="flex pl-4 text-[14px] border-r-transparent items-center text-[rgba(0,0,0,0.45)]  hover:text-[#262626] py-2 cursor-pointer transition-all delay-500 hover:bg-[#bfbfbfe1] hover:border-r-[#5F5F5F] border-r-solid border-r-2 ">
                  <FaPlus size={20} className="mr-2 flex" /> Add More Tags
                </div>
              </div>

              <div className="mb-2">
                <span className="pl-4 text-[14px] font-[500] mb-3 block text-[#595959]">
                  More
                </span>

                <div className="flex pl-4 text-[14px] border-r-transparent items-center text-[rgba(0,0,0,0.45)]  hover:text-[#262626] py-2 cursor-pointer transition-all delay-500 hover:bg-[#bfbfbfe1] hover:border-r-[#5F5F5F] border-r-solid border-r-2 ">
                  <FaRegClock className="mr-2" size={16} /> Recents
                </div>

                <div className="flex pl-4 text-[14px] border-r-transparent items-center text-[rgba(0,0,0,0.45)]  hover:text-[#262626] py-2 cursor-pointer transition-all delay-500 hover:bg-[#bfbfbfe1] hover:border-r-[#5F5F5F] border-r-solid border-r-2 ">
                  <FaTrash className="mr-2" size={16} /> Trash
                </div>
              </div>
            </div>

            <div className="border-t-[#D9D9D9] min-h-[223px] border-t-[1px] pt-3">
              <div className="flex pl-4 items-center mb-3">
                <BsCloudy className="mr-3" size={20} />
                <span className="font-[500] text-[14px] block text-[#595959]">
                  Storage
                </span>
              </div>

              <div className="px-4 mb-1">
                <span className="text-[14px]">1.18 GB of 150 GB </span>
              </div>

              <div className="px-4">
                <LinearProgress
                  variant="determinate"
                  sx={{
                    height: 6,
                    borderRadius: "5rem",
                    backgroundColor: "#D9D9D9",
                  }}
                  value={40}
                />
              </div>

              <div className="px-4 pb-10 mt-4 flex justify-center">
                <Button
                  className="text-[14px] text-[#000] w-full hover:text-white hover:bg-[rgba(0,0,0,0.3)]  capitalize"
                  variant="contained"
                >
                  Upgrade Storage Size
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full pl-[236px] h-full flex flex-col">
          <div className="px-5 border-l border-r h-full">
            <div className="flex justify-between py-4">
              <div className="font-semibold text-[28px] text-black">
                My Drive
              </div>
              <div className="">
                <button className="py-2 flex items-center px-8 bg-[#1890FF] text-white rounded-md text-[16px] transition-all delay-300 hover:bg-[#0c75d6] font-[300]">
                  <FaPlus size={12} className="mr-2" /> Upload
                </button>
              </div>
            </div>
            <div className="px-1">
              <div className="flex items-center justify-between pt-7">
                <Paper
                  component="form"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "calc(100% - 35px)",
                    fontSide: 16,
                    height: 42,
                    border: "1px solid #00000073",
                    boxShadow: "none",
                  }}
                  onSubmit={() => false}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1, color: "#999" }}
                    placeholder="Search File, Folder, Drive name"
                    inputProps={{ "aria-label": "search" }}
                  />
                  <IconButton
                    type="submit"
                    sx={{
                      p: "12px",
                      borderLeft: "1px solid #00000073",
                      borderRadius: 0,
                    }}
                    aria-label="search"
                  >
                    <TbSearch size={16.07} color="#00000073" />
                  </IconButton>
                </Paper>
                <div className="cursor-pointer">
                  {false ? (
                    <BsList size={19} color="#00000073" />
                  ) : (
                    <BsGrid3X3Gap size={19} color="#00000073" />
                  )}
                </div>
              </div>

              <div
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(186px, 1fr))",
                }}
                className="pt-7 grid gap-2 grid-flow-dense"
              >
                <Folder
                  data={{
                    name: "slide",
                    size: 224,
                    files: 10,
                  }}
                />

                <Folder
                  data={{
                    name: "slide main",
                    size: 224,
                    files: 10,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="h-full px-[16px] py-[31px] min-w-[354px] w-[354px]">
          <div className="flex mb-6 items-center">
            <div className="mr-3">
              <Image src={user} width={64} height={64} alt="user" />
            </div>

            <div>
              <h3 className="text-[20px] mb-1 leading-7 text-[#000000D9] font-[500]">
                Hi, There
              </h3>

              <Link href="/settings">
                <a className="text-[#00000073] text-[14px] leading-[22px] font-[400]">
                  Profile Settings
                </a>
              </Link>
            </div>
          </div>

          <div className="mb-[23px]">
            <span className="text-[14px] block mb-4 font-[500] leading-5 text-[#595959]">
              Type File
            </span>

            <div className="flex justify-between mb-[18px] items-center">
              <div className="flex items-center">
                <AiOutlineFileImage
                  size={14}
                  className="mr-[11px]"
                  color={"#00000073"}
                />

                <span className="text-[14px] text-[#00000073] font-[400] leading-5">
                  Photo & Video
                </span>
              </div>
              <Link href="/">
                <a className="text-[14px] cursor-pointer text-[#00000073] font-[400]">
                  See all
                </a>
              </Link>
            </div>

            <div className="flex justify-between mb-[18px] items-center">
              <div className="flex items-center">
                <AiOutlineFilePdf
                  size={14}
                  className="mr-[11px]"
                  color={"#00000073"}
                />

                <span className="text-[14px] text-[#00000073] font-[400] leading-5">
                  Documents
                </span>
              </div>
              <Link href="/">
                <a className="text-[14px] cursor-pointer text-[#00000073] font-[400]">
                  See all
                </a>
              </Link>
            </div>

            <div className="flex justify-between mb-[18px] items-center">
              <div className="flex items-center">
                <AiOutlineFileUnknown
                  size={14}
                  className="mr-[11px]"
                  color={"#00000073"}
                />

                <span className="text-[14px] text-[#00000073] font-[400] leading-5">
                  Others
                </span>
              </div>
              <Link href="/">
                <a className="text-[14px] cursor-pointer text-[#00000073] font-[400]">
                  See all
                </a>
              </Link>
            </div>
          </div>

          <div className="mb-[23px]">
            <span className="text-[14px] block mb-4 font-[500] leading-5 text-[#595959]">
              Pinned
            </span>

            <Pinned data={{
                name: "Office Work",
                items: 10,
                size: 23
            }}/>

            

            
          </div>
        </div>
      </div>
    </>
  );
    
}


export default Dashboard;
