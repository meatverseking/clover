import Moralis from 'moralis';

export const messages: object[] = [{}];

const DAO = Moralis.Object.extend('DAOs');


export const getMessages = () => {

}

export const sendMessage = (data: object) => {
    messages.push(data);    

    
    
}

export const checkMessages = () => {

}