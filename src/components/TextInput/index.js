import React from "react";
import "./TextInput.css";

export default function TextInput(props) {
  return (
    <div className="compose">
      <input
        type="text"
        className="compose-input"
        placeholder="Type a message, @name"
      />

      {props.rightItems}
    </div>
  );
}
