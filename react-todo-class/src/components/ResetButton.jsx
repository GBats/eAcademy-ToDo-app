import React from "react";

function ResetButton(props) {
  return (
    <button className="reset-btn" onClick={props.callback}>
      {props.title}
    </button>
  );
}

export default ResetButton;
