import React, { useEffect, useState } from "react";

const TodoList = () => {
    const host = "https://playground.4geeks.com/todo";
    const user = "CarlesViolan";

    const [tasks, setTasks] = useState([]);
    const [newTask, setnewTask] = useState("");
    const [taskEdit, settaskEdit] = useState("");


    // Create User Function (POST)
    async function createUser() {
        try {
            const response = await fetch(`${host}/users/${user}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Create User Error");
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Gettask function (GET)
    async function getTasks() {
        const uri = `${host}/users/${user}`
        const options = { method: "GET" }
        const response = await fetch(uri, options);
        if (!response.ok) {
            console.log("Error", response.status, response.statusText);
        };
        const data = await response.json();
        setTasks(data.todos);

    };

    // Create Task function (POST)
    async function createTasks() {
        const uri = `${host}/todos/${user}`
        const todo = { label: newTask, is_done: false };
        const options = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(todo)
        };
        const response = await fetch(uri, options);
        if (!response.ok) {
            console.log("Errrrrrrror", response.status, response.statusText);
        };

        setnewTask("");
        getTasks();
    };

    // update function
    async function editTask(item) {

        settaskEdit(item);
        setnewTask(item.label);
        enableButtonUpdate();
        disableButtonCreate();
    };

    // Función método PUT
    async function actualizartasks(item) {
        const uri = `${host}/todos/${item.id}`
        const updateTodo = { ...item, label: newTask };
        const options = {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(updateTodo)
        };
        const response = await fetch(uri, options);
        if (!response.ok) {
            console.log("Erroooorror", response.status, response.statusText);
        };
        setnewTask("");
        getTasks();
        window.location.reload();
    };

    // remove task each function (DELETE)
    async function deletetasks(item) {
        const uri = `${host}/todos/${item.id}`
        const options = {
            method: "DELETE",
        };
        const response = await fetch(uri, options);
        if (!response.ok) {
            console.log("Errrror", response.status, response.statusText);
        };
        getTasks();
    };

    async function deleteAlltasks() {
        const uri = `${host}/users/${user}`
        const options = {
            method: "DELETE",
        };
        const response = await fetch(uri, options);
        if (!response.ok) {
            console.log("Erroorrrrrrrr", response.status, response.statusText);
        };
        getTasks();
        window.location.reload();
    };

// functions to enable and disable buttons
    async function disableButtonUpdate(){
    const myElement = document.getElementById("updateButton");
        myElement.style.display = "none";
    }
    async function enableButtonUpdate(){
        const myElement = document.getElementById("updateButton");
            myElement.style.display = "block";
        }
    async function disableButtonCreate(){
            const myElement = document.getElementById("createButton");
                myElement.style.display = "none";
            }
    async function enableButtonCreate(){
                const myElement = document.getElementById("createButton");
                    myElement.style.display = "block";
                }

    useEffect(() => {
        disableButtonUpdate();
        createUser();
        getTasks();
    }, []);

    return (
        <div className="container">
            <div className="row">
             <div className="col-12">
                    <h1 className="title">ToDoListReactFetch</h1>
      
             </div>
            <div className="row">
             <div className="col-12">
                            <input
                                className="form-control rounded-0 border-bottom-0 fs-2 ps-5"
                                type="text"
                                value={newTask}
                                onChange={(evento) => setnewTask(evento.target.value)}
                                placeholder="Create a Task"
                            />
                            <div className="d-flex justify-content-center text-center m-3 rounded-0">

                                <button id="createButton" className="btn btn-info createTask" onClick={() => createTasks()} >
                                    {"Create Task"}
                                </button>
                                <button id="updateButton" className="btn btn-info actualizarTask" onClick={() => actualizartasks(taskEdit)} >
                                    {"Update Task"}
                                </button>
                            </div>
                     </div>
                 </div>
                 <div className="row">
                            <div className="col-12">
                            {tasks.map((item) =>
                                <ul className="list-group rounded-0" style={{ listStyle: "none" }}>
                                    <li className="list-group-item d-flex justify-content-between align-items-center fs-3 ps-5 rounded-0">{item.label}
                                        <span
                                            className="edit-btn btn btn-sm fs-3"
                                            onClick={() => editTask(item)

                                            }
                                        >
                                            Edit
                                        </span>
                                        <span
                                            className="delete-btn btn btn-sm fs-3"
                                            onClick={() => deletetasks(item)}
                                        >
                                            X
                                        </span>
                                    </li>
                                </ul>
                            )}
                  
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="d-flex justify-content-end text-center rounded-0">
                                <button className="btn btn-danger col-12" onClick={() => { deleteAlltasks() }}>Remove List</button>
                            </div>  
                            <p></p>
                            <div className="d-flex justify-content-end text-center">
                                <button className="panel-heading col-12">The List content is {tasks.length}</button>
                            </div> 
                            
                                             
                        </div>
                    </div>
                </div>
            </div>
       
    );
};
export default TodoList;