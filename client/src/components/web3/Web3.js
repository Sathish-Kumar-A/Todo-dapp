import React, { useContext, createContext, useState, useEffect } from 'react';
import Todo from "../../contracts/Todo.json";
import {getWeb3} from '../../getWeb3';

export const web3Context = createContext();
export const taskCountContext = createContext();

export const Web3 = ({ children }) => {
    const [state, setState] = useState({
        web3: null,
        accounts: null,
        contract: {},
    });

    const [taskCount, setTaskCount] = useState(0);

    useEffect(() => {
        getWeb3AccountsAndContract();
    }, []);

    const getWeb3AccountsAndContract = async () => { 
        try {
            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = Todo.networks[networkId];
            const todoContract = new web3.eth.Contract(Todo.abi, deployedNetwork && deployedNetwork.address);      
            setState({ ...state, web3, accounts, contract: { "Todo": todoContract } });
            setTaskCount(await todoContract.methods.taskCount().call());
        }
        catch (err) {
            console.log(err);
        }
    }


  return (
      <web3Context.Provider value={state}>
        {children}
    </web3Context.Provider>
  )
}

export const useWeb3 = () => { 
    const context = useContext(web3Context);
    return context;
}
