import React from 'react';
import { useGetTasks } from '../web3/Web3';


export const Tasks = ({ setFormInput,Todo,accounts }) => {
    const { allTasks, getTasks } = useGetTasks();

    const deleteTask = async (id) => {
        let response = await Todo.methods.deleteTask(id).send({ from: accounts[0] });
        getTasks(Todo);
    }

  return (
      <div className = 'w-50' >
          {allTasks ? allTasks.map((task, index) => {
              if (task.title.length) {
                  return (
                      <div key = {index} className = " my-3 py-4 px-4" style = {{backgroundColor: "#D3D3D3"}} >
                              <div className = 'd-flex align-items-center' >
                                <h6 className='mb-0'>Title:</h6>
                                <p className='mb-0 text-dark mx-3'>{task.title}</p>
                              </div>
                            <div>
                                <div className = 'd-flex align-items-center' >
                                        <h6 className='mb-0'>Body:</h6>
                                        <p className='mb-0 text-dark mx-2'>{task.body}</p>
                                </div>
                            </div>
                          <button className='btn btn-primary mt-2' onClick={()=>setFormInput({title:task.title,body:task.body,edit:true,id:index})}>Edit</button>
                          <button className='btn btn-danger mx-3 mt-2' onClick={()=>deleteTask(index)}>Delete</button>
                          </div>
                  )
              }
            }) :<p>Loading ....</p>}
    </div>
  )
}
