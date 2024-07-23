// export default ToDoList;
import React from "react";
import { useEffect, useState } from "react";
//import style from "styled-components";

const fetchTodos = async (setState) => {
  const connection = await fetch(
    "https://jsonplaceholder.typicode.com/todos/"
  ).then((response) => response.json());
  setState(connection);
};

const ToDoListAsinc = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetchTodos(setTodos);
  }, []);
  return (
    <ul>
      {todos.map((t) => (
        <li key={t.id}>
          {t.title}
          {/* {t.title} <input type="checkbox" checked={t.completed} /> */}
        </li>
      ))}
    </ul>
  );
};

export default ToDoListAsinc;