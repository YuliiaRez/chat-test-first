import React from "react";
import "./ConversationSearch.css";

export default function ConversationSearch({ onChanging, search }) {
  return (
    <div className="conversation-search">
      <img
        className="conversation-photo"
        src="https://img2.freepng.es/20180320/gxe/kisspng-forehead-silhouette-face-monochrome-contacts-5ab092e9d5e7b5.6873975415215213858762.jpg"
        alt="avatar"
      />
      <input
        type="search"
        className="conversation-search-input"
        placeholder="Search chat"
        value={search}
        onChange={(e) => onChanging(e)}
        autoFocus
        autoComplete="off"
      />
    </div>
  );
}
