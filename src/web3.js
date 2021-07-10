import Web3 from "web3";
 
window.ethereum.request({ method: "eth_requestAccounts" });           // Requesting access from "Metamask" to connect with our application.
 
const web3 = new Web3(window.ethereum);                               // Replacing the default web3 instance of metamask with our own web3 instance.
 
export default web3;




/*
 Why replacement is needed?
1] It doesn't matter on which website you are, metamask will always inject an instance of web3 in it. We cannot stop it from doing so.
2] Metamask uses old version of web3 which relies on callbacks.
3] But the good thing is it has an inbuilt provider which connect metamask to any selected network.
4] Metamask's provider also has access to Pub/Pri keys of all our accounts.
5] We are using latest version of web3, so we are required to replaced metamask's provider with our own provider. 
6] We actually repaced the whole "Old Web3" instance of metamask with our "Latest Web3" instance
7] In this we can use any version of web3 which we want while working with metamask.

IMP : We are connencting our "Metamask Account" with our "Application" inorder to achieve above thing.
      Metamask ask for your password and then connection is formed between metamask and application.
*/