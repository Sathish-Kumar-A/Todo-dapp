import React,{useEffect, useMemo, useState} from 'react';
import { useWeb3, useGetTasks } from '../web3/Web3';
import { Tasks } from '../Tasks/Tasks';

export const Home = () => {
    const { web3, accounts, contract } = useWeb3();
    // console.log(useGetTasks());
    const {allTasks,getTasks} = useGetTasks();
    const { Todo } = contract;
    
    const [formInput, setFormInput] = useState({
        title: "",
        body: "",
        completed: false,
        edit:false
    });

    // useEffect(() => {
    //     getTasks();
    // },[])

    const handleChange = (e) => {
        if (e.target.type ==="checkbox") { 
            setFormInput({...formInput, [e.target.name]: e.target.checked});
        }
        else {
            setFormInput({
                ...formInput,
                [e.target.name]: e.target.value
            });
        }
    }

    const addTask = async() => {
        const { events } = await Todo.methods.createTask(formInput.title, formInput.body).send({ from: accounts[0] });
        if (events["TaskCreation"]["returnValues"]["success"]) {
            setFormInput({...formInput,
                title: "",
                body: ""
            });
            getTasks(Todo);
        }
        else {
            alert("Task Creation Failed");
        }
        console.log(events);
    }

    const editTask = async () => {
        const { events } = await Todo.methods.editTask(formInput.id,formInput.title, formInput.body,formInput.completed).send({ from: accounts[0] });
        setFormInput({
            title: "",
            body: "",
            completed: false,
            edit: false
        })
        getTasks(Todo);
    }

    return (
        <div>
            {Todo &&
                <div className = 'd-flex justify-content-center bg-secondary text-white pt-2'>
                    <p>Contract Address:</p>
                    <h5 className='mx-2'>{Todo["_address"]}</h5>
                </div>
            }
        <div className='d-flex flex-column align-items-center'>
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
                    <div className='mt-2 d-flex align-items-center'>
                        <label>Completed:</label>
                        <input
                            type="checkbox"
                            checked={formInput.completed}
                            onChange={handleChange}
                            name="completed"
                            className='mx-3'
                        />
                    </div>
                    {Todo && <button className='btn btn-success align-self-center mt-4' onClick={formInput["edit"]?editTask:addTask}>{formInput["edit"]?"Save change":"Add task"}</button>}
            </div>
                <Tasks setFormInput={setFormInput} Todo={Todo} accounts={accounts}/>
            </div>
        </div>
  )
}
