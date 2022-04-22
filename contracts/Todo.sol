// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Todo{
    uint public taskCount=0;
    Task[] public tasksArray;

    struct Task{
        uint id;
        string title;
        string body;
        bool completed;
    }

    event TaskCreation(
        bool success,
        Task createdTask
    );

    event allTasks(
        Task[] array
    );

    mapping(uint=> Task) public tasks;

    function createTask(string memory title, string memory body) public returns(bool){
        tasks[taskCount]=Task(taskCount,title,body,false);
        tasksArray.push(tasks[taskCount]);
        emit TaskCreation(true,tasks[taskCount]);
        taskCount++;
        return true;
    }

    function editTask(uint id,string memory title,string memory body,bool completed) public returns(bool){
        tasks[id]=Task(id,title,body,completed);
        emit TaskCreation(true,tasks[taskCount]);
        return true;
    }

    function deleteTask(uint id) public returns(bool){
        delete tasks[id];
        for(uint i=id;i<=taskCount;i++){
            tasks[id]=tasks[id+1];
        }
        taskCount--;
        return true;
    }

    function getTasks() public returns(Task[] memory){
        emit allTasks(tasksArray);
        return tasksArray;
    }

}