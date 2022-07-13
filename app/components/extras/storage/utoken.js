import { Web3Storage } from "web3.storage";

export const makeStorageClient = (token) => {
    return new Web3Storage({
        token
    });
};