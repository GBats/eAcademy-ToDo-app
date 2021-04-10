import React from "react";
import "../Todo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faTrash,
  faEdit,
  faArrowCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import ResetButton from "./ResetButton";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      todos: [],
      visible: -1,
      updatedValue: null,
      error: "",
    };
    this.ActionButtons = [
      { name: "Reset all", func: this.handleResetTasks },
      { name: "Reset all checked", func: this.handleResetChecked },
      { name: "Reset all done", func: this.handleResetDone },
    ];
  }

  componentDidMount() {
    const myTodos = JSON.parse(localStorage.getItem("todos")) || [];
    this.setState({ todos: myTodos });
  }
  componentDidUpdate() {
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  }

  handleInput = (event) => {
    this.setState(() => ({ inputValue: event.target.value }));
  };

  handleUpdateInput = (event) => {
    this.setState(() => ({ updatedValue: event.target.value }));
  };

  handleAdd(todo, event) {
    if (event.type === "click" || event.key === "Enter") {
      if (todo === "" || todo.trim() === "") {
        this.setState(() => ({ error: "Please enter a task" }));
        return;
      } else if (
        this.state.todos.filter(
          (x) => x.name.toLowerCase() === todo.toLowerCase()
        ).length > 0 &&
        this.state.todos.length > 0
      ) {
        this.setState(() => ({
          error: "You already have this task",
          inputValue: "",
        }));
        return;
      }
      let obj = {
        name: todo,
        isDone: false,
        check: false,
      };
      let arr = [...this.state.todos, obj];
      this.setState(() => ({
        todos: arr,
        inputValue: "",
        error: "",
      }));
    }
  }

  handleRemove(index) {
    const popStateTodo = (idx) => {
      this.state.todos.filter(
        (todo) => todo.name !== this.state.todos[idx].name
      );
      return;
    };
    this.setState({
      todos: popStateTodo(index),
      visible: -1,
      error: "",
    });
  }

  handleVisible = (index) => {
    this.setState({ visible: index });
  };

  handleUpdateTodo = (index, event) => {
    if (event.type === "click" || event.key === "Enter") {
      if (
        this.state.updatedValue === "" ||
        this.state.updatedValue === null ||
        this.state.updatedValue.trim() === ""
      ) {
        this.setState({ visible: -1 });
        return;
      }
      if (
        this.state.todos.filter(
          (todo, idx) => todo.name === this.state.updatedValue && idx !== index
        ).length > 0
      ) {
        this.setState({ error: "You already have a task" });
        return;
      }
      let arr = [...this.state.todos];
      arr[index].name = this.state.updatedValue;
      this.setState(() => ({
        todos: arr,
        error: "",
        updatedValue: null,
        visible: -1,
      }));
    }
  };
  handleMoveTask = (index, indexSwap) => {
    let temp = this.state.todos[index];
    let arr = this.state.todos;
    arr[index] = arr[indexSwap];
    arr[indexSwap] = temp;
    this.setState({ todos: arr });
  };

  handleMoveUp = (index) => {
    if (index === 0) {
      this.setState({ error: "You can't move up this task" });
      return;
    } else {
      this.handleMoveTask(index, index - 1);
      this.setState(() => ({
        error: "",
        visible: -1,
      }));
    }
  };

  handleMoveDown = (index) => {
    if (index === this.state.todos.length - 1) {
      this.setState({ error: "You can't move down this task" });
      return;
    }
    this.handleMoveTask(index, index + 1);
    this.setState(() => ({
      error: "",
      visible: -1,
    }));
  };

  handleIsDone(index) {
    let arr = [...this.state.todos];
    arr[index].isDone = !arr[index].isDone;
    this.setState({ todos: arr });
  }

  handleCheck = (todo) => {
    todo.check = !todo.check;
    this.setState({ todos: this.state.todos });
  };

  handleResetTasks = () => {
    if (this.state.todos.length === 0) {
      this.setState({ error: "You don't have tasks" });
      return;
    }
    this.setState(() => ({
      visible: -1,
      error: "",
      todos: [],
    }));
  };

  handleResetChecked = () => {
    let arr = [...this.state.todos];
    if (arr.filter((item) => item.check === true).length === 0) {
      this.setState({ error: "You don't have checked tasks" });
      return;
    }
    arr = arr.filter((todo) => todo.check === false);
    this.setState(() => ({
      todos: arr,
      error: "",
    }));
  };

  handleResetDone = () => {
    let arr = [...this.state.todos];
    if (arr.filter((item) => item.isDone === true).length === 0) {
      this.setState({ error: "You don't have completed tasks" });
      return;
    }
    arr = arr.filter((todo) => todo.isDone === false);
    this.setState(() => ({
      todos: arr,
      error: "",
    }));
  };

  render() {
    return (
      <div className="app">
        <div className="container">
          <div className="content">
            <h1>ToDo List</h1>
            <div className="display-error">
              <p>{this.state.error}</p>
            </div>
            <div className="todos-input">
              <input
                onKeyPress={(event) =>
                  this.handleAdd(this.state.inputValue, event)
                }
                className="input"
                placeholder="Add a task"
                value={this.state.inputValue}
                onChange={this.handleInput}
              />
              <button
                className="add-button"
                onClick={(event) =>
                  this.handleAdd(this.state.inputValue, event)
                }
              >
                +
              </button>
            </div>
            <div className="todos-list">
              <ul>
                {this.state.todos.map((todo, index) => (
                  <li key={index}>
                    <div className="list">
                      <div className="list-content">
                        <input
                          className="checkbox"
                          type="checkbox"
                          checked={todo.check}
                          onChange={() => this.handleCheck(todo)}
                        />

                        <p
                          className={
                            todo.isDone ? "isdone text" : "notdone text"
                          }
                          onClick={() => this.handleIsDone(index)}
                        >
                          {todo.name}
                        </p>
                      </div>
                      <div className="list-action">
                        <FontAwesomeIcon
                          className="list-btn"
                          icon={faCaretUp}
                          onClick={() => this.handleMoveUp(index)}
                        />
                        <FontAwesomeIcon
                          className="list-btn"
                          icon={faCaretDown}
                          onClick={() => this.handleMoveDown(index)}
                        />
                        <FontAwesomeIcon
                          className="list-btn"
                          icon={faTrash}
                          onClick={() => this.handleRemove(index)}
                        />
                        <FontAwesomeIcon
                          className="list-btn"
                          icon={faEdit}
                          onClick={() => this.handleVisible(index)}
                        />
                      </div>

                      {this.state.visible === index ? (
                        <div className="update">
                          <input
                            className="input"
                            placeholder="update todo"
                            onKeyPress={(event) =>
                              this.handleUpdateTodo(index, event)
                            }
                            value={
                              this.state.updatedValue === null
                                ? todo.name
                                : this.state.updatedValue
                            }
                            onChange={this.handleUpdateInput}
                          />
                          <button
                            className="list-action-btn update-btn"
                            onClick={(e) => this.handleUpdateTodo(index, e)}
                          >
                            Update
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="reset-buttons">
            {this.ActionButtons.map((item) => (
             <ResetButton title={item.name} callback={item.func}/>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Todo;
