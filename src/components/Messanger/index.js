import React, { useState, useEffect } from "react";
import ConversationList from "../ConversationList";
import MessageList from "../MessageList";
import { query, collection, onSnapshot, orderBy } from "firebase/firestore";
import { firestore } from "../../index.js";
import { initialContacts, initialConversation } from "./initial";

import "./Messanger.css";

export default function Messenger() {
  const [currConvers, setCurrConvers] = useState(initialConversation);
  const [lastConvs, setlastConvs] = useState(initialContacts);
  const [messages, setMessages] = useState([]);
  // const [newEvent, setNewEvent] = useState(false);

  const chooseConvers = (data) => {
    setCurrConvers({ ...currConvers, ...data });
  };

  useEffect(() => {
    const q = query(
      collection(firestore, `${currConvers.userId}`),
      orderBy("timestamp")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
      setMessages(items);
      let arr = [...lastConvs.filter((it) => it.userId !== currConvers.userId)];
      arr.unshift(items[items.length - 1]);
      setlastConvs(arr);
    });

    return () => unsubscribe();
  }, [currConvers, messages.length]);

  return (
    <>
      <div className="messenger">
        <div className="scrollable sidebar">
          <ConversationList
            chooseConvers={chooseConvers}
            lastConvs={lastConvs}
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
