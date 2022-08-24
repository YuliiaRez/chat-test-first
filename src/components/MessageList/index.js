import React, { useEffect, useState, useRef } from "react";

import { firestore } from "../../index";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import "./MessageList.css";

import Message from "../Message";
import SendMessage from "../SendMessage";

const MessageList = (props) => {
  const { currConvers } = props;
  const [messages, setMessages] = useState([]);
  const scroll = useRef();
  useEffect(() => {
    let databaseName = String(currConvers.userId);
    const q = query(
      collection(firestore, `${databaseName}`),
      orderBy("timestamp")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, [props]);

  return (
    <>
      <div className="message-list">
        <div className="message-list-container">
          <div className="current-conversation-container">
            <img
              className="message-photo"
              src={currConvers.userAvatar}
              alt="avatar"
            />
            <span className="current-conversation-name">
              {currConvers.userName}
            </span>
          </div>
          <div className="message-list-container">
            {messages &&
              messages.map((message) => (
                <Message key={message.id} message={message} />
              ))}
          </div>
          <SendMessage scroll={scroll} currConvers={currConvers}></SendMessage>
        </div>

        <span ref={scroll}></span>
      </div>
    </>
  );
};
export default MessageList;
