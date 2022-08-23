import React, { useState, useEffect } from "react";
import ConversationList from "../ConversationList";
import MessageList from "../MessageList";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import { firestore } from "../../index.js";

import "./Messanger.css";

export default function Messenger(props) {
  const [currConvers, setCurrConvers] = useState({
    userId: "1",
    userName: "",
    userAvatar: "",
  });
  const chooseConvers = (data) => {
    setCurrConvers({ ...currConvers, ...data });
  };

  const [lastConvs, setlastConvs] = useState([]);
  const [usersId, setusersId] = useState([]);
  const [databaseEvent, setdatabaseEvent] = useState(false);

  useEffect(() => {
    let databaseName = String("1" /*data.userId*/);
    const q = query(
      collection(firestore, `${databaseName}`),
      orderBy("timestamp")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
      let itemNew = [];
      itemNew.unshift(items[items.length - 1]);
      setlastConvs(itemNew);
    });

    return () => unsubscribe();
  }, [props]);
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
