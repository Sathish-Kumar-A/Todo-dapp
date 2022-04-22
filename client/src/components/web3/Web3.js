import React, { useContext, createContext, useState, useEffect } from 'react';
import Todo from "../../contracts/Todo.json";
import {getWeb3} from '../../getWeb3';

export const web3Context = createContext();
export const taskCountContext = createContext();
export const tasks = createContext();

export const Web3 = ({ children }) => {
    const [state, setState] = useState({
        web3: null,
        accounts: null,
        contract: {},
    });

    const [taskCount, setTaskCount] = useState(0);
    const [allTasks,setAllTasks]=useState([]);

    useEffect(() => {
        getWeb3AccountsAndContract();
    }, []);

    const getTasks = async (contract) => {
            console.log("Getting Tasks");
            const taskCountResponse = await contract.methods.taskCount().call();
        setTaskCount(taskCountResponse);
        const newTasks = [];
            for (let i = 0; i <= taskCountResponse; i++) {
                const task = await contract.methods.tasks(i).call();
                newTasks.push(task);
            }
            setAllTasks(newTasks);
    }

    const getWeb3AccountsAndContract = async () => { 
        try {
            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = Todo.networks[networkId];
            const todoContract = new web3.eth.Contract(Todo.abi, deployedNetwork && deployedNetwork.address);      
            setState({ ...state, web3, accounts, contract: { "Todo": todoContract } });
            getTasks(todoContract);
        }
        catch (err) {
            console.log(err);
        }
    }


  return (
      <web3Context.Provider value={state}>
          <tasks.Provider value={{allTasks,getTasks}}>
             {children}
          </tasks.Provider>
    </web3Context.Provider>
  )
}

export const useWeb3 = () => { 
    const context = useContext(web3Context);
    return context;
}

export const useGetTasks = () => {
    const context = useContext(tasks);
    return context;
}
