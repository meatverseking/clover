import axios from 'axios';
const Moralis = require('moralis')
import { connect, Connection, SUPPORTED_CHAINS } from "@tableland/sdk";


export type store = {
    name: string,
    date?: string | number,
    type: string,
    cid: string[],
    link?: string[],
    shared?: string | string[],
    size: number,
    deleted: boolean
}

export type fstructure = {
    [index:string]: store[] | store
}

export type mainStructor = {
    [index: string]: store | fstructure | (store | fstructure)[]
}



let tableland:Connection;

//main init
export const beginStorageProvider = async () => {
    tableland = await connect(SUPPORTED_CHAINS['polygon-mumbai']);
}


// initializes the user account
export const createUserTables = async (username:string) => {
        const { name, txnHash } = await tableland.create(
          `files text, name text, id int, primary key (id)`, 
          `userfiles` 
        );

       const { hash } = await  tableland.write(
             `INSERT INTO userfiles (id, name, files) VALUES (1, '${username}', '{}');`
           )

    if (hash !== undefined) {
        return name;
    }else{
        return false;
    }
}

//gets the full table name
export const getUserTable = async (table_name:string) => {
        const tables = await tableland.list();
        let realName = "";
        tables.forEach(({ name }: { name: string }) => {
        const real = name.split("_");
        if (real[0] === table_name) {
            realName = name;
        }
    });

    return realName;    
}


const readDFiles = async () => {
  const name = getUserTable('userfiles');

  const { rows } = await tableland.read(`SELECT files FROM ${name} WHERE id = 1;`);

  return rows[0][0];
};

export const updateDFiles = async (files: mainStructor) => {
  const table = getUserTable("userfiles");

  const storeFormat = JSON.stringify(files);

  const xx = await tableland.write(
    `UPDATE ${table} SET files = '${storeFormat}' where id = '1'`
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

export const storeFiles = (file: mainStructor) => {
    
};

export const retrieveFiles = (files?: string)/*: fstructure | store | mainStructor*/ => {
  if (files !== undefined) {

  } else {

  }
};