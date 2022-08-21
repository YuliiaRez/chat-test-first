import React, { useState } from "react";
import ConversationList from "../ConversationList";
import MessageList from "../MessageList";

import "./Messenger.css";

export default function Messenger(props) {
  const [currConvers, setCurrConvers] = useState({});
  const chooseConvers = (dat) => {
    setCurrConvers({ ...dat });
  };
  return (
    <>
      <div className="messenger">
        <div className="scrollable sidebar">
          <ConversationList chooseConvers={chooseConvers} />
        </div>

        <div className="scrollable content">
          <MessageList currConvers={currConvers} />
        </div>
      </div>
    </>
  );
}
