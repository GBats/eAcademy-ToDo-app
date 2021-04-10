import React from "react";

function GroupButtons(props) {
  const handleReset = () => {
    if (props.list.length === 0) {
      return props.error("you do not have tasks");
    }
    props.updates([]);
    props.error("");
  };

  const handleResetChecked = () => {
    let newArr = props.list.filter((todo) => todo.checked === false);
    let checkedTasks = props.list.filter((todo) => todo.checked === true);
    if (checkedTasks.length === 0) {
      return props.error("you do not have checked tasks");
    }
    props.updates(newArr);
  };

  const handleResetDone = () => {
    let newArr = props.list.filter((todo) => todo.isDone === false);
    let doneTasks = props.list.filter((todo) => todo.isDone === true);
    if (doneTasks.length === 0) {
      return props.error("you do not have done tasks");
    }
    props.updates(newArr);
  };

  return (
    <div className="grp-buttons">
      <button className="glb-btn" onClick={handleReset}>Reset all</button>
      <button className="glb-btn" onClick={handleResetChecked}>Reset checked</button>
      <button className="glb-btn" onClick={handleResetDone}>Reset isDone</button>
    </div>
  );
}

export default GroupButtons;
