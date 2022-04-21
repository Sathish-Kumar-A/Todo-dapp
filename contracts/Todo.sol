// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Todo{

    uint public taskCount=0;
    struct Task{
        uint id;
        string title;
        string body;
        bool completed;
    }
    event TaskCreation(
        bool success,
        Task createdtask
    );

    mapping(uint=> Task) public tasks;

    function createTask(string memory title, string memory body) public returns(bool){
        tasks[taskCount]=Task(taskCount,title,body,false);
        taskCount++;
        emit TaskCreation(true, tasks[taskCount]);
        return true;
    }

    // function get
}

// contract TodoFunction{
//     Todo _todoConfig=new Todo();

// }