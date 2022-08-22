import React, { useState, useEffect } from "react";
import ConversationListItem from "../ConversationListItem";
// import Toolbar from "../Toolbar";
// import ToolbarButton from "../ToolbarButton";
import axios from "axios";

import "./ChucksAnswer.css";

export default function ChuckAnswer(props) {
  const [conversations, setConversations] = useState([]);
  const [answer, setAnswer] = useState({ icon_url: "", answerValue: "" });

  useEffect(() => {
    getChuckAnswer();
  }, [props]); /*в зависимость поставить массив моих сообщений */

  const getChuckAnswer = () => {
    axios.get("https://api.chucknorris.io/jokes/random").then((response) => {
      console.log("response", response);
      setAnswer({
        icon_url: response.data.icon_url,
        answerValue: response.data.value,
      });
    });
  };

  return (
    <div className="conversation-list">
      <Toolbar
        title="Messenger"
        leftItems={[<ToolbarButton key="cog" icon="ion-ios-cog" />]}
        rightItems={[
          <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />,
        ]}
      />
      {/* <ConversationSearch />
      {conversations.map((conversation) => (
        <ConversationListItem key={conversation.name} data={conversation} />
      ))} */}
    </div>
  );
}
