import React from "react";
import { format } from "date-fns";
import q from "./face.jpg";

import "./Message.css";

const Message = ({ message }) => {
  const date = format(new Date(message.messageId), "Pp");
  return (
    <div>
      <div className={`message `}>
        <div
          className={
            message.mine ? "message-photo-text-mine" : "message-photo-text"
          }
        >
          {!message.mine && (
            <img
              className="message-photo"
              src={message.userAvatar}
              alt="avatar"
            />
          )}
          <span
            className={
              message.mine ? "bubble-container-mine" : "bubble-container"
            }
          >
            <span className={message.mine ? "bubble-mine" : "bubble"}>
              {message.text}
            </span>
          </span>
        </div>

        <div className={!message.mine ? "timestamp" : "timestamp-mine"}>
          {date}
        </div>
      </div>
    </div>
  );
};
export default Message;
