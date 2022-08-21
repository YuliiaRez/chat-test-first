import React, { useEffect } from "react";
import shave from "shave";

import "./ConversationListItem.css";

export default function ConversationListItem(props) {
  const { onClick, data } = props;

  useEffect(() => {
    shave(".conversation-snippet", 20);
  });
  const { userAvatar, userName, lastMess } = data;

  return (
    <div onClick={() => onClick(data)} className="conversation-list-item">
      <img className="conversation-photo" src={userAvatar} alt="conversation" />
      <div className="conversation-info">
        <h1 className="conversation-title">{userName}</h1>
        <p className="conversation-snippet">{lastMess}</p>
      </div>
    </div>
  );
}
