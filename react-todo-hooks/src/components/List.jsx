import React, { useState } from "react";
import Error from "./Error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faTrash,
  faEdit,
  faArrowCircleUp,
} from "@fortawesome/free-solid-svg-icons";

function List(props) {
  const [visible, setVisible] = useState(-1);
  const [input, setInput] = useState(null);
  const [error, setError] = useState("");
  const { list } = props;

  const handleRemove = (task) => {
    let newList = list.filter((todo) => todo.task !== task);
    props.updates(newList);
  };

  const handleVisible = (idx) => {
    setError("");
    setVisible(idx);
  };
  const handleEdit = (event, preTodo, input) => {
    if (event.type === "click" || event.key === "Enter") {
      if (
        input === "" ||
        input === preTodo.task ||
        input === null ||
        input.trim() === ""
      ) {
        props.error("")
        setInput(null);
        return setVisible(-1);
      }
      let origin = list.filter((todo) => todo.task === input).length;
      if (origin > 0) {
        
        setInput(null);
        return props.error("you already have this task");
      }
      preTodo.task = input;
      props.updates([...list]);
      setError("");
      setInput(null);
      setVisible(-1);
    }
  };

  const handleUp = (idx) => {
    if (idx === 0) {
      return props.error("You cant move up this task");
    }
    let temp = list[idx];
    list[idx] = list[idx - 1];
    list[idx - 1] = temp;
    let newList = [...list];
    setVisible(-1);
    props.error("");
    props.updates(newList);
  };

  const handleDown = (idx) => {
    if (idx === list.length - 1) {
      return props.error("You cant move down this task");
    }
    let temp = list[idx];
    list[idx] = list[idx + 1];
    list[idx + 1] = temp;
    let newList = [...list];
    setVisible(-1);
    props.error("");
    props.updates(newList);
  };

  const handleDone = (todo) => {
    todo.isDone = !todo.isDone;
    let newArr = [...list];
    props.updates(newArr);
  };

  const handleChecked = (todo) => {
    todo.checked = !todo.checked;
    let newArr = [...list];
    props.updates(newArr);
  };

  return (
    <div className="list">
      <ul>
        {list.map((todo, idx) => (
          <li key={idx} className={todo.isDone ? "isdone task" : "task"}>
            <div className="input-update">
              <input
                className="checkbox"
                type="checkbox"
                checked={todo.checked}
                onChange={() => handleChecked(todo)}
              />

              {visible === idx ? (
                <div className="update">
                  <input
                    className="update-text"
                    onKeyPress={(event) => handleEdit(event, todo, input)}
                    type="text"
                    value={input === null ? todo.task : input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <FontAwesomeIcon
                    className="actions-btn"
                    icon={faArrowCircleUp}
                    onClick={(event) => handleEdit(event, todo, input)}
                  />
                </div>
              ) : (
                <span className={todo.isDone ? "isdone" : "notdone"} onClick={() => handleDone(todo)}>{todo.task}</span>
              )}
            </div>

            <div className="action-btns">
              <FontAwesomeIcon
                className="actions-btn"
                icon={faCaretUp}
                onClick={() => handleUp(idx)}
              />
              <FontAwesomeIcon
                className="actions-btn"
                icon={faCaretDown}
                onClick={() => handleDown(idx)}
              />
              <FontAwesomeIcon
                className="actions-btn"
                icon={faTrash}
                onClick={() => handleRemove(todo.task)}
              />
              <FontAwesomeIcon
                className="actions-btn"
                icon={faEdit}
                onClick={() => handleVisible(idx)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
