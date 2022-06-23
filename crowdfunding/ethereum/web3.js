import Web3 from 'web3';


const funct = async () =>{
let provider;
if(typeof window !== undefined && typeof window.ethereum !== undefined){ //browser has both ethereum and metamask and code is being rendered on the browser
    provider - await window.ethereum.requests({method:"eth_requestAccounts"});
}

else{
    provider = await Web3.provider.HttpProvider("https://rinkeby.infura.io/v3/4bf2abe843a049e5b784627c536d31b7");
}
console.log(provider);
return provider;
}

const web3 = new Web3(funct());

export default web3;