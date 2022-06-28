import { Web3Storage } from "web3.storage";
import Link from 'next/link';
import {
  LinearProgress,
  Button
} from "@mui/material"

import { FaRegFolderOpen, FaPlus, FaFolder, FaTrash, FaRegClock } from 'react-icons/fa'
import { BsCloudy } from 'react-icons/bs'
import { TbUsers } from 'react-icons/tb'
import { FaSearch } from "react-icons/fa";
import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Folder from "../../app/components/folder";


const makeStorageClient = async () => {
  // return new Web3Storage({
  //   token: ''
  // });
};

const beginUpload = async (files: FileList) => {
  const { size: totalSize } = files[0];

  const onRootCidReady = (cid: string) => { };

  let uploaded = 0;

  const onStoredChunk = (size: number) => {
    uploaded += size;

    const pct = (totalSize / uploaded) * 100;

    console.log(`Uploading... ${pct.toFixed(2)}% complete`);
  };

  const client = await makeStorageClient();

  // return client.put(files, { onRootCidReady, onStoredChunk });
};

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
    }} className="w-full flex items-start justify-between filedrop min-h-screen">
    <div className="h-full bg-[#f5F5F5] sidebar fixed min-w-[236px] w-[236px]">
      <div className="mt-3 mb-5">
        <Link href="/">
          <div className="text-[#1890FF] flex pl-4 items-center font-bold text-[18px]">
            <FaFolder size={25} className="mr-5 flex" color={'#1890FF'}/> 
             Virtual Drive
            </div>
        </Link></div>

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
            <div className="h-[14px] w-[14px] mr-2 rounded-[50%] bg-[#FF4D4F]"></div> Red
        </div>
          

        <div className="flex pl-4 text-[14px] border-r-transparent items-center text-[rgba(0,0,0,0.45)]  hover:text-[#262626] py-2 cursor-pointer transition-all delay-500 hover:bg-[#bfbfbfe1] hover:border-r-[#5F5F5F] border-r-solid border-r-2 ">
              <div className="h-[14px] w-[14px] mr-2 rounded-[50%] bg-[#FADB14]"></div> Yellow
        </div>

        <div className="flex pl-4 text-[14px] border-r-transparent items-center text-[rgba(0,0,0,0.45)]  hover:text-[#262626] py-2 cursor-pointer transition-all delay-500 hover:bg-[#bfbfbfe1] hover:border-r-[#5F5F5F] border-r-solid border-r-2 ">
              <div className="h-[14px] w-[14px] mr-2 rounded-[50%] bg-[#40A9FF]"></div> Blue
        </div>

         <div className="flex pl-4 text-[14px] border-r-transparent items-center text-[rgba(0,0,0,0.45)]  hover:text-[#262626] py-2 cursor-pointer transition-all delay-500 hover:bg-[#bfbfbfe1] hover:border-r-[#5F5F5F] border-r-solid border-r-2 ">
              <div className="h-[14px] w-[14px] mr-2 rounded-[50%] bg-[#52C41A]"></div> Green
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
          <BsCloudy className="mr-3" size={20}/>
          <span className="font-[500] text-[14px] block text-[#595959]">
          Storage
        </span>
          </div>

          <div className="px-4 mb-1">
            <span className="text-[14px]">1.18 GB of 150 GB </span>
          </div>

          <div className="px-4">
              <LinearProgress variant="determinate" sx={{
                height: 6,
                borderRadius: '5rem',
                backgroundColor: '#D9D9D9'
              }} value={40}/>
          </div>

          <div className="px-4 pb-10 mt-4 flex justify-center">
              <Button className="text-[14px] text-[#000] w-full hover:text-white hover:bg-[rgba(0,0,0,0.3)]  capitalize" variant="contained">
                Upgrade Storage Size
              </Button>
          </div>


        </div>

        </div>
    </div>
    <div className="w-full pl-[236px] h-full flex flex-col">
        <div className="px-5 border-l border-r h-full">
          <div className="flex justify-between py-4">
            <div className="font-semibold text-4xl text-black">My Cloud</div>
            <div className="">
              <button className="py-2 px-8 bg-[#1890FF] text-white rounded-md">
                Upload
              </button>
            </div>
          </div>

          <div className="flex justify-center pt-7">
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 600,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search for File or Folder"
                inputProps={{ "aria-label": "search" }}
              />
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <FaSearch color="#1890FF" />
              </IconButton>
            </Paper>
          </div>

          <div className="pt-8">
            <Folder />
          </div>
        </div>
    </div>
    <div className="h-full min-w-[250px] w-[250px]">
        too
    </div>
    </div>)
}


export default Dashboard;
