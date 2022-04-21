import React,{useMemo, useState} from 'react';
import { useWeb3 } from '../web3/Web3';

export const Home = () => {
    const { web3, accounts, contract } = useWeb3();
    const {Todo} = contract;
    // console.log(Todo);
    const [formInput, setFormInput] = useState({
        title: "",
        body: ""
    });

    const handleChange = (e) => {
        setFormInput({
            ...formInput,
            [e.target.name]: e.target.value
        });
    }

    const addTask = async() => {
        await Todo.methods.createTask(formInput.title, formInput.body).send({from: accounts[0]});
    }

    return (
        <div>
            {Todo &&
                <div className = 'd-flex justify-content-center bg-secondary text-white pt-2'>
                    <p>Contract Address:</p>
                    <h5 className='mx-2'>{Todo["_address"]}</h5>
                </div>
            }
        <div className='w-50 d-flex flex-column justify-content-center border rounded p-3 my-5' style={{ margin: "0 auto" }}>
                <div className='mt-2'>
                    <label>Title</label>
                    <input
                        type="text"
                        id="title"
                        className='form-control'
                        name="title"
                        onChange={handleChange}
                        value={formInput.title}
                    />
                </div>
                <div className='mt-2'>
                    <label>Body</label>
                    <textarea
                        type="text"
                        id="title"
                        className='form-control'
                        name="body"
                        onChange={handleChange}
                        value={formInput.body}
                    />
                </div>
                {Todo && <button className='btn btn-success align-self-center mt-4' onClick={addTask}>Add Task</button>}
            </div>
        </div>
  )
}
