import React from "react";
import ConversationList from "../ConversationList";
import MessageList from "../MessageList";
import Navbar from "../Navbar";

import "./Messenger.css";

export default function Messenger(props) {
  return (
    <>
      <Navbar />
      <div className="messenger">
        <div className="scrollable sidebar">
          <ConversationList />
        </div>

        <div className="scrollable content">
          <MessageList />
        </div>
      </div>
    </>
  );
}
