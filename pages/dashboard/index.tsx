import Link from 'next/link';
import { RiLogoutCircleLine, RiSettingsLine } from 'react-icons/ri';
import {
  LinearProgress,
  Button,Paper, InputBase, IconButton, Popper, Box, Fade, 
} from "@mui/material"
import logo from '../../public/images/logo.png';
import user from '../../public/images/user.png';
import Image from 'next/image'

import { FaRegFolderOpen, FaPlus, FaFolder, FaTrash, FaRegClock } from 'react-icons/fa';
import { MdMenuOpen, MdMenu } from "react-icons/md";
import { BsCloudUpload, BsCloudy, BsFillCloudUploadFill, BsGrid3X3Gap, BsList, BsPeople, BsPinAngle } from "react-icons/bs";
import { TbSearch } from 'react-icons/tb';
import Dash from "../../app/components/dash";
import Folder from "../../app/components/folder";

import { useMoralis } from "react-moralis";
import { useContext, useState, useEffect } from "react";
import { GenContext } from "../../app/components/extras/contexts/genContext";
import { makeStorageClient } from "../../app/components/extras/storage/utoken"
import { beginStorageProvider, createUserTables, initData, initDataStorage, readDFiles, store, userTable, verifyHash } from '../../app/components/extras/storage';


const Dashboard = () => {
  const { Moralis } = useMoralis();

  const [currentDir, setCurrentDir] = useState<string[]>(["main"]);

  /* upload */
  const uploadData = useContext(GenContext);

  const { upload } = uploadData;

  const { success, error, loading } = upload;

  const triggerUpload = (w: any) => {
    uploadFiles(w.files);
  };

  const [fileData, setFileData] = useState({});

  const [init, setInit] = useState<any>(''); //replace Joel George with user name

  beginStorageProvider().then(x => {

      // setInit(createUserTables("Joel George"));

      console.log(x)

  });

  useEffect(() => {
    // if(typeof init != 'string'){
    // init.then((xx:any) => {
    //   if (xx.create === true) {
    //     const dfiles = readDFiles();

    //     dfiles.then((d) => {
    //       setFileData(typeof d == "string" ? JSON.parse(d) : d);
    //     });
    //   } else {
    //     verifyHash(xx.create).then((c) => {
    //       if (c === true) {
    //         initDataStorage("Joel George");
    //         setFileData(initData);
    //       }
    //     });
    //   }
    // });
  // }
  }, [fileData, init]);

  const uploadFiles = (files: FileList) => {
    let maxSize: number = 0;
    const blobFiles: File[] = [];

    for (let i: number = 0; i < files.length; i++) {
      let startPointer: number = 0;
      let endPointer: number = files[i].size;
      maxSize += files[i].size;
      let chunks: any[] = [files[i].name, files[i].type, []];
      while (startPointer < endPointer) {
        let newStartPointer: number = startPointer + files[i].size;
        chunks[2].push(files[i].slice(startPointer, newStartPointer));
        startPointer = newStartPointer;
      }

      blobFiles.push(
        new File(
          [new Blob(chunks[2], { type: files[i].type })],
          files[i].name,
          { type: files[i].type, lastModified: files[i].lastModified }
        )
      );
    }

    uploadProvider(blobFiles, maxSize);
  };

  const dropHere = (event: React.DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
    const fileList = event.dataTransfer.files;
    uploadFiles(fileList);
  };

  const dragHere = (event: React.DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  };

  const uploadProvider = async (files: File[], totalSize: number) => {
    let index: number = 0;
    const onRootCidReady = (cid: string) => {
      error?.update("");
      success?.update(true);

      console.log(cid, index);

      // const addFiles:store = {
      //   name: files[index].name,
      //   date: files[index].lastModified,
      //   type: files[index].type,
      //   size: files[index].size,
      //   cid: [ cid ],
      //   deleted: false
      // }
      index++;
    };

    let uploaded = 0;

    const onStoredChunk = (size: number) => {
      uploaded += size;

      const pct: number = (uploaded / totalSize) * 100;

      console.log(`Uploading... ${pct.toFixed(2)}% complete`);

      loading?.update(pct);
    };

    const client = makeStorageClient(
      await Moralis.Cloud.run("getWeb3StorageKey")
    );

    files.forEach((file, i) => {
      return client.put([file], { onRootCidReady, onStoredChunk });
    });
  };

  /*end of upload*/

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  const [side, uside] = useState<boolean>(true);

  const [side3, uside3] = useState<boolean>(true);

  const mside = () => {
    uside(!side);

    setTimeout(() => {
      uside3(!side3);
    }, 500);
  };

  const sidebar = (color?: string) =>
    side3 ? (
      <MdMenuOpen color={color} size={30} />
    ) : (
      <MdMenu color={color} size={30} />
    );

  return (
    <>
      <Dash />
      <div
        onDragOver={(event) => {
          dragHere(event);
        }}
        onDrop={(event) => {
          dropHere(event);
        }}
        className="w-full flex items-start justify-between filedrop min-h-screen"
      >
        <button className="py-2 mr-4 hidden st:flex fixed right-0 bottom-[10px] justify-center z-[90] items-center px-4 bg-[#1890FF] text-white w-[60px] h-[60px] rounded-[50%] overflow-hidden transition-all delay-500 hover:bg-[#0c75d6] font-[300]">
          <BsFillCloudUploadFill size={30} />
        </button>
        <div
          style={{
            width: side ? 236 : 0,
            minWidth: side ? 236 : 0,
          }}
          className="h-full bg-[#f5F5F5] overflow-hidden border-l border-l-[#F0F0F0] sidebar st:z-[200] st:absolute fixed transition-all delay-500"
        >
          <div className="mt-[1.6rem] st:flex st:justify-between st:items-center mb-[1.24rem]">
            <Link href="/">
              <a className="text-[#1890FF] cursor-pointer flex pl-4 items-center font-bold text-[18px]">
                <Image src={logo} width={100} height={33.33} alt="clover" />
              </a>
            </Link>

            <div
              onClick={mside}
              className="mr-2 hidden st:block cursor-pointer"
            >
              {sidebar("#1890ff")}
            </div>
          </div>

          <div className="flex flex-col h-full">
            <div className="cusscroller h-[calc(100%-1.25rem-0.75rem-27px)] overflow-y-scroll overflow-x-hidden">
              <div className="mb-2">
                <span className="pl-4 font-[500] mb-3 block text-[#595959]">
                  Drive Storage
                </span>

                <div className="flex pl-4 text-[14px] border-l-transparent items-center text-[rgba(0,0,0,0.45)]  hover:text-[#262626] py-2 cursor-pointer transition-all delay-500 hover:bg-[#bfbfbfe1] hover:border-l-[#5F5F5F] border-l-solid border-l-2 ">
                  <FaRegFolderOpen className="mr-2" size={20} /> My Drive
                </div>

                <div className="flex pl-4 text-[14px] border-l-transparent items-center text-[rgba(0,0,0,0.45)]  hover:text-[#262626] py-2 cursor-pointer transition-all delay-500 hover:bg-[#bfbfbfe1] hover:border-l-[#5F5F5F] border-l-solid border-l-2 ">
                  <BsPeople className="mr-2" size={20} /> Shared with me
                </div>

                <div className="flex pl-4 text-[14px] border-l-transparent items-center text-[rgba(0,0,0,0.45)]  hover:text-[#262626] py-2 cursor-pointer transition-all delay-500 hover:bg-[#bfbfbfe1] hover:border-l-[#5F5F5F] border-l-solid border-l-2 ">
                  <BsPinAngle className="mr-2" size={20} /> Pinned
                </div>
              </div>

              {/* <div className="mb-2">
                <span className="pl-4 font-[500] text-[14px] mb-3 block text-[#595959]">
                  Tags
                </span>

                <div className="flex pl-4 text-[14px] border-l-transparent items-center text-[rgba(0,0,0,0.45)]  hover:text-[#262626] py-2 cursor-pointer transition-all delay-500 hover:bg-[#bfbfbfe1] hover:border-l-[#5F5F5F] border-l-solid border-l-2 ">
                  <div className="h-[14px] w-[14px] mr-2 rounded-[50%] bg-[#FF4D4F]"></div>{" "}
                  Red
                </div>

                <div className="flex pl-4 text-[14px] border-l-transparent items-center text-[rgba(0,0,0,0.45)]  hover:text-[#262626] py-2 cursor-pointer transition-all delay-500 hover:bg-[#bfbfbfe1] hover:border-l-[#5F5F5F] border-l-solid border-l-2 ">
                  <div className="h-[14px] w-[14px] mr-2 rounded-[50%] bg-[#FADB14]"></div>{" "}
                  Yellow
                </div>

                <div className="flex pl-4 text-[14px] border-l-transparent items-center text-[rgba(0,0,0,0.45)]  hover:text-[#262626] py-2 cursor-pointer transition-all delay-500 hover:bg-[#bfbfbfe1] hover:border-l-[#5F5F5F] border-l-solid border-l-2 ">
                  <div className="h-[14px] w-[14px] mr-2 rounded-[50%] bg-[#40A9FF]"></div>{" "}
                  Blue
                </div>

                <div className="flex pl-4 text-[14px] border-l-transparent items-center text-[rgba(0,0,0,0.45)]  hover:text-[#262626] py-2 cursor-pointer transition-all delay-500 hover:bg-[#bfbfbfe1] hover:border-l-[#5F5F5F] border-l-solid border-l-2 ">
                  <div className="h-[14px] w-[14px] mr-2 rounded-[50%] bg-[#52C41A]"></div>{" "}
                  Green
                </div>

                <div className="flex pl-4 text-[14px] border-l-transparent items-center text-[rgba(0,0,0,0.45)]  hover:text-[#262626] py-2 cursor-pointer transition-all delay-500 hover:bg-[#bfbfbfe1] hover:border-l-[#5F5F5F] border-l-solid border-l-2 ">
                  <FaPlus size={20} className="mr-2 flex" /> Add More Tags
                </div>
              </div> */}

              <div className="mb-2">
                <span className="pl-4 text-[14px] font-[500] mb-3 block text-[#595959]">
                  More
                </span>

                <div className="flex pl-4 text-[14px] border-l-transparent items-center text-[rgba(0,0,0,0.45)]  hover:text-[#262626] py-2 cursor-pointer transition-all delay-500 hover:bg-[#bfbfbfe1] hover:border-l-[#5F5F5F] border-l-solid border-l-2 ">
                  <FaRegClock className="mr-2" size={16} /> Recents
                </div>

                <div className="flex pl-4 text-[14px] border-l-transparent items-center text-[rgba(0,0,0,0.45)]  hover:text-[#262626] py-2 cursor-pointer transition-all delay-500 hover:bg-[#bfbfbfe1] hover:border-l-[#5F5F5F] border-l-solid border-l-2 ">
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
                  style={{
                    fontFamily: "inherit",
                  }}
                  className="text-[14px] text-[#000] w-full hover:text-white hover:bg-[rgba(0,0,0,0.3)]  capitalize"
                  variant="contained"
                >
                  Upgrade Storage
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            paddingLeft: side ? 236 : 0,
          }}
          className="w-full st:!pl-0 transition-all delay-500 h-full flex flex-col"
        >
          <div className="px-5 h-full">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <div onClick={() => mside()} className="mr-2 cursor-pointer">
                  {sidebar()}
                </div>
                <div className="font-semibold text-[20px] text-black">
                  My Drive
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="file"
                  multiple
                  onChange={triggerUpload}
                  className="!hidden input_upload"
                  style={{
                    display: "none",
                    visibility: "hidden",
                  }}
                />
                <button
                  onClick={() => {
                    const elem = document?.querySelector(
                      ".input_upload"
                    ) as HTMLElement;

                    elem?.click();
                  }}
                  className="py-2 mr-4 st:!hidden flex flex-row-reverse items-center px-4 bg-[#1890FF] text-white w-[52px] hover:w-[120px] flex-nowrap rounded-md text-[16px] overflow-hidden max-h-[40px] transition-all delay-500 hover:bg-[#0c75d6] font-[300]"
                >
                  <BsCloudUpload size={20} className="min-w-[20px]" />{" "}
                  <span className="mr-4">Upload</span>
                </button>

                <div
                  aria-describedby={id}
                  onClick={handleClick}
                  className="border-[2px] overflow-hidden border-solid border-[#1890FF] h-[50px] w-[50px] cursor-pointer rounded-[50%]"
                >
                  <Image src={user} width={47} height={47} alt="user" />
                </div>

                <Popper id={id} open={open} anchorEl={anchorEl} transition>
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                      <Box
                        sx={{
                          minWidth: 200,
                          p: 1,
                          borderRadius: "4px",
                          border: "1px solid #ededed",
                          bgcolor: "background.paper",
                        }}
                      >
                        <Link href="dashboard/settings">
                          <a className="flex pl-4 text-[14px] items-center text-[rgba(0,0,0,0.45)] hover:bg-[#6262621f] py-2 cursor-pointer transition-all delay-500 mb-1 rounded-[3px]">
                            <RiSettingsLine className="mr-2" size={20} />{" "}
                            Settings
                          </a>
                        </Link>

                        <div className="flex pl-4 rounded-[3px] text-[14px] items-center text-[rgba(0,0,0,0.45)] hover:bg-[#6262621f] py-2 cursor-pointer transition-all delay-500">
                          <RiLogoutCircleLine className="mr-2" size={20} /> Log
                          Out
                        </div>
                      </Box>
                    </Fade>
                  )}
                </Popper>
              </div>
            </div>
            <div className="px-1">
              <div className="flex items-center justify-between pt-3">
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
                className="flist pt-7 grid gap-2 grid-flow-dense"
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
      </div>
    </>
  );
};


export default Dashboard;
