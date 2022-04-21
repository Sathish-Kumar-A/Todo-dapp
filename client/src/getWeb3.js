import Web3 from "web3";

export const getWeb3 = async () => {
  var web3;
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable();
      return web3;
    }
    catch (error) { 
      console.log(error);
    }
  }
  else if (window.web3) {
    web3 = window.web3;
    return web3;
  }
  else {
    const provider = new Web3.providers.HttpProvider(
      "http://127.0.0.1:8545"
    );
    web3 = new Web3(provider);
    return web3;
  }
}

// export default getWeb3;
