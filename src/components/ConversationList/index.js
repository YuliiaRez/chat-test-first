import React, { useState, useEffect } from "react";
import ConversationSearch from "../ConversationSearch";
import ConversationListItem from "../ConversationListItem";
import Toolbar from "../Toolbar";
import ToolbarButton from "../ToolbarButton";
import axios from "axios";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import { firestore } from "../../index";

import "./ConversationList.css";

export default function ConversationList(props) {
  const { chooseConvers } = props;

  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    const q = query(collection(firestore, "contactsDb"), orderBy("tsLastMess"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let conversations = [];
      querySnapshot.forEach((doc) => {
        conversations.push({ ...doc.data(), id: doc.id });
      });
      setConversations(conversations);
    });
    return () => unsubscribe();
  }, [props]);

  return (
    <div className="conversation-list">
      <Toolbar
        title="Messenger"
        leftItems={[<ToolbarButton key="cog" icon="ion-ios-cog" />]}
        rightItems={[
          <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />,
        ]}
      />
      <ConversationSearch />
      {conversations.map((conversation) => (
        <ConversationListItem
          key={conversation.userName}
          data={conversation}
          onClick={chooseConvers}
        />
      ))}
    </div>
  );
}
