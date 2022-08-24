import React, { useEffect, useState } from "react";
import shave from "shave";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import { format } from "date-fns";
import { firestore } from "../../index.js";

import "./ConversationListItem.css";

export default function ConversationListItem(props) {
  const { onClick, data } = props;
  const [lastItem, setlastItem] = useState([]);
  const date = format(new Date(data.messageId), "PP");
  useEffect(() => {
    let databaseName = String(data.userId);
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
      setlastItem(itemNew);
    });

    return () => unsubscribe();
  }, [props]);

  // useEffect(() => {
  //   chatsDescOrder(lastItem);
  // }, [lastItem]);

  useEffect(() => {
    shave(".conversation-snippet", 20);
  });

  return (
    <div onClick={() => onClick(data)} className="conversation-list-item">
      <img
        className="conversation-photo"
        src={data.userAvatar}
        alt="conversation"
      />
      <div className="conversation-info">
        <h1 className="conversation-title">{data.userName}</h1>
        <p className="conversation-snippet">{data.text}</p>
        <p className="conversation-snippet">{date}</p>
      </div>
    </div>
  );
}
