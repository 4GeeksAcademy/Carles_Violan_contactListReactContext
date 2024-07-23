//import react into the bundle
import React from "react";
import ReactDOM from "react-dom/client";

// include your styles into the webpack bundle
import "../styles/index.css";

//import your own components
import Home from "./component/home.jsx";
import ToDoList from "./component/todolist.jsx";
//import ToDoList from "./component/todolist_orig.jsx";
//import ToDoList from "./component/todolist_async.jsx";

//render your react application
ReactDOM.createRoot(document.getElementById('app')).render(<ToDoList />);
//ReactDOM.createRoot(document.getElementById('app')).render(<ToDoListAsinc />);

