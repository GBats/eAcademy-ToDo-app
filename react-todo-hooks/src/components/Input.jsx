import React, { useState, useEffect } from "react";
import Error from "./Error";
import GroupButtons from "./GroupButtons";
import List from "./List";

function Input() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const myTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(myTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = (event, input) => {
    if (event.type === "click" || event.key === "Enter") {
      if (input === "" || input.trim()==="") {
        return setError("Please enter a task");
      }
      if (todos.filter((todo) => todo.task === input).length > 0) {
        return setError("You already have this task");
      }
      let newTodo = {
        task: input,
        isDone: false,
        checked: false,
      };
      setTodos([...todos, newTodo]);
      setError("");
      setInput("");
    }
  };

  const getUpdatedList = (list) => {
    setTodos(list);
  };

  const getErros = (error) => {
    setError(error);
  };

  return (
    <div className="main-container">
      <div className="input-bar">
        <h1>ToDo List</h1>
        <Error error={error} />
        <input
          onKeyPress={(event) => handleAdd(event, input)}
          className="input"
          placeholder="Enter a task"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="add-button" onClick={(event) => handleAdd(event,input)}>
          +
        </button>
      </div>

      <List list={todos} updates={getUpdatedList} error={getErros} />
      <GroupButtons list={todos} updates={getUpdatedList} error={getErros} />
    </div>
  );
}

export default Input;
