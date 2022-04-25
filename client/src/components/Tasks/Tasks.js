import React from 'react';
import { useGetTasks } from '../web3/Web3';


export const Tasks = ({ setFormInput,Todo,accounts }) => {
    const { allTasks, getTasks } = useGetTasks();

    const deleteTask = async (id) => {
         await Todo.methods.deleteTask(id).send({ from: accounts[0] });
        getTasks(Todo);
    }

  return (
      <div className = 'w-50' >
      {allTasks ? allTasks.map((task, index) => {
            console.log(task)
              if (task.title.length) {
                  return (
                      <div key = {index} className = " my-3 py-4 px-4 rounded" style = {{backgroundColor: "#D3D3D3"}} >
                              <div className = 'd-flex align-items-center' >
                                <h6 className='mb-0'>Title:</h6>
                                <p className='mb-0 text-dark mx-3'>{task.title}</p>
                              </div>
                                <div className = 'd-flex align-items-center' >
                                        <h6 className='mb-0'>Body:</h6>
                                        <p className='mb-0 text-dark mx-2'>{task.body}</p>
                      </div>
                      <div className = 'd-flex align-items-center' >
                        <h6 className='mb-0'>Completed: </h6>
                        <p className='mb-0 text-dark mx-2'>{task.completed?"true":"false"}</p>
                      </div>
                            <button className='btn btn-primary mt-2' onClick={()=>setFormInput({title:task.title,body:task.body,edit:true,id:index,completed:task.completed})}>Edit</button>
                            <button className='btn btn-danger mx-3 mt-2' onClick={()=>deleteTask(index)}>Delete</button>
                          </div>
                  )
              }
            }) :<p>Loading ....</p>}
    </div>
  )
}
