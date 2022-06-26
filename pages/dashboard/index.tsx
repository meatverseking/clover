
import { Web3Storage } from "web3.storage";

import {
  LinearProgress
} from "@mui/material";


 const makeStorageClient = async () => {
        // return new Web3Storage({
        //   token: ''
        // });
      }

      const beginUpload = async (files:FileList) => {
        const { size: totalSize } = files[0];
    

        const onRootCidReady = (cid:string) => {
        
            
    
        };

        let uploaded = 0;

        const onStoredChunk = (size: number) => {
          uploaded += size;

          const pct = (totalSize / uploaded) * 100;

          console.log(`Uploading... ${pct.toFixed(2)}% complete`);

        };

        const client = await makeStorageClient();

        return client.put(files, { onRootCidReady, onStoredChunk });
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
    
    <div onDragOver={(event) => {
          event.stopPropagation();
          event.preventDefault();
          event.dataTransfer.dropEffect = 'copy';
    }} onDrop={(event) => {
         event.stopPropagation();
        event.preventDefault();
     const fileList = event.dataTransfer.files;
        //  sendStuff(fileList)
    }} className="w-full flex items-start justify-between flex-wrap filedrop h-screen">
    <div className="h-full min-w-[350px] w-[350px]">

    </div>
    <div className="w-full h-full">

    </div>
    <div className="h-full min-w-[250px] w-[250px]">

    </div>
    </div>)
}

export default Dashboard;