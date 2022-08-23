import React from "react";
import "./ConversationSearch.css";

export default function ConversationSearch({ onChanging, search }) {
  return (
    <div className="conversation-search">
      <input
        type="search"
        className="conversation-search-input"
        placeholder="Search Contacts"
        value={search}
        onChange={(e) => onChanging(e)}
        autoFocus
        autoComplete="off"
      />
    </div>
  );
}
