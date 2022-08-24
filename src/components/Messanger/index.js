import React, { useState, useEffect } from "react";
import ConversationList from "../ConversationList";
import MessageList from "../MessageList";
import Toolbar from "../Toolbar";
import ToolbarButton from "../ToolbarButton";
// import { query, collection, onSnapshot, orderBy } from "firebase/firestore";
// import { firestore } from "../../index.js";
import { /* initialContacts*/ initialConversation } from "./initial";

import "./Messanger.css";

export default function Messanger() {
  const [currConvers, setCurrConvers] = useState(initialConversation);
  // const [newEvent, setNewEvent] = useState(false);

  const chooseConvers = (data) => {
    setCurrConvers({ ...currConvers, ...data });
  };

  return (
    <>
      <div className="messanger">
        <div className="scrollable sidebar">
          <ConversationList
            chooseConvers={chooseConvers}
            currConvers={currConvers}

            // lastConvs={lastConvs}
          />
        </div>
        <div className="scrollable content">
          <MessageList
            currConvers={currConvers}
            // setNewEvent={setNewEvent}
            // newEvent={newEvent}
          />
        </div>
      </div>
    </>
  );
}
