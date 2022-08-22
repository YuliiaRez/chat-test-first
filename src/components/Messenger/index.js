import React, { useState } from "react";
import ConversationList from "../ConversationList";
import MessageList from "../MessageList";

import "./Messenger.css";

export default function Messenger(props) {
  const [currConvers, setCurrConvers] = useState({
    userId: 1,
    userName: "Ilona Maker ",
  });
  const chooseConvers = (dat) => {
    setCurrConvers({ ...currConvers, ...dat });
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
