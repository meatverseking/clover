import { Web3Storage } from "web3.storage";
import { FaSearch } from "react-icons/fa";
import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Folder from "../../app/components/folder";

import { LinearProgress } from "@mui/material";

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
      }}
      className="w-full flex items-start justify-between filedrop h-screen"
    >
      <div className="h-full min-w-[350px] w-[350px]">hereh</div>
      <div className="w-full h-full flex flex-col">
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
      <div className="h-full min-w-[250px] w-[250px]">too</div>
    </div>
  );
};

export default Dashboard;
