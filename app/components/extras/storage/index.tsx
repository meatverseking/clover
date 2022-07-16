import axios from 'axios';
const Moralis = require('moralis')
import { connect, Connection, SUPPORTED_CHAINS } from "@tableland/sdk";


export type store = {
    name: string,
    date?: string | number,
    tag: "default" | number | string,
    type: string,
    cid: string[],
    link?: string[],
    file: boolean,
    shared?: string | string[],
    size: number,
    deleted: boolean
}

export interface dir { 
    name: string,
    deleted: boolean,
    file: boolean,
    tag: string | number | 'default'
}

export interface fstructure extends dir {
  files: (store | dir)[];
}

const updateSearch = (files: (store | dir)[], newFiles: store[], fileFolder: string[], num: number = 1) => {

    files.forEach((data: any) => {
        if(data['files'] !== undefined){
            if(num !== fileFolder.length - 1){
                updateSearch(data['files'], newFiles, fileFolder, num++);
            } else {
                if(data['name'] == fileFolder[fileFolder.length - 1]){

                    newFiles.forEach(xx => {
                        data.files.push(xx)
                    });          

                    return true;
                }
            }
        }      
    })
}



export let userTable:Connection;

//main init
export const beginStorageProvider = async () => {
    userTable = await connect(SUPPORTED_CHAINS['polygon-mumbai']);
}

//gets the full table name
export const getUserTable = async (table_name:string) => {
        const tables = await userTable.list();
        let realName = "";
        tables.forEach(({ name }: { name: string }) => {
        const real = name.split("_");
        if (real[0] === table_name) {
            realName = name;
        }
    });

    return realName;    
}

export const verifyHash = async (hash: any) => {
        const receiptRes = await userTable.receipt(
              hash
        );
            if(receiptRes === undefined){
                setTimeout(() => {
                     verifyHash(hash);
                }, 500)
            }else{
                return true
            }
  }

// initializes the user account
export const createUserTables = async (username:string) => {
      const exists = await getUserTable('userfiles');

      if(!exists.length){
        const { name, txnHash } = await userTable.create(
          `files text, name text, id int, primary key (id)`, 
          `userfiles` 
        );

        return {create: txnHash};

      }else{
        return { create: true }
      }
}

export const initData:fstructure = {
  name: "main",
  tag: "default",
  files: [],
  deleted: false,
  file: false,
};

export const initDataStorage = async (username: string) => {
      const store = JSON.stringify(initData);
      const { hash } = await userTable.write(
        `INSERT INTO userfiles (id, name, files) VALUES (1, '${username}', '${store}');`
      );

      return hash;

}


export const readDFiles = async () => {
  const name = await getUserTable('userfiles');

  const { rows } = await userTable.read(`SELECT files FROM ${name} WHERE id = 1;`);

  return rows[0][0];
};

export const updateDFiles = async (files: fstructure) => {
  const table = await getUserTable("userfiles");

  const storeFormat = JSON.stringify(files);

  const xx = await userTable.write(
    `UPDATE ${table} SET files = '${storeFormat}' WHERE id = '1'`
  );

  if (xx) {
    return true;
  } else {
    return false;
  }
};

export const deleteFile = async (cid: string) => {

    const token = await Moralis.Cloud.run("getWeb3StorageKey");

    const config = {
      data: {

      },
      header: {
        Accept: "*/*",
        Authentication: `Bearer ${token}`,
      },
    };

    axios.delete(`https://api-staging.web3.storage/pins/${cid}`, config).then(done => {
        return done.data;
    }).catch(err => {
        return err;
    });

}

/**
 * @param dirfolder: array - showing file directory till destination
 * **/

export const storeFiles = async (file: store[], dirfolder: string[]) => {
  const fileData = await readDFiles();

  updateSearch(fileData.files, file, dirfolder);

  await updateDFiles(fileData);

  return fileData;
};


const getFileList = (files: (store | dir)[], dirFolder: string[], num:number = 1) => {

    files.forEach((file: any) => {
      if (file["files"] !== undefined) {
        if (num !== dirFolder.length - 1) {

          getFileList(file["files"], dirFolder, num + 1);

        } else {
          if (file["name"] == dirFolder[dirFolder.length - 1]) {

              return file;

          }
        }
      }
    });

    return {};

};

/**
 * @param dirfolder - directory folder till destination seperated by . or undefined
 * eg - main.folder.folder
 * **/

export const retrieveFiles = async (folder?: string[]) => {
  const fileData = await readDFiles();

  if (folder !== undefined) {
  
    return getFileList(fileData.files, folder);

  } else {

    return fileData;

  }
};