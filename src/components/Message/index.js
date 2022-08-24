import React, { useEffect } from "react";
import { format } from "date-fns";

import "./Message.css";

const Message = ({ message }) => {
  const messageClass = message.mine ? `message-mine` : ``;

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
// export default function Message(props) {
//   const {
//     /*data, isMine, startsSequence, endsSequence, showTimestamp*/ message,
//   } = props;

//   // const friendlyTimestamp = moment(data.timestamp).format("LLLL");
//   return (
//     <div
//       className={[
//         "message",
//         `${isMine ? "mine" : ""}`,
//         `${startsSequence ? "start" : ""}`,
//         `${endsSequence ? "end" : ""}`,
//       ].join(" ")}
//     >
//       {showTimestamp && <div className="timestamp">{friendlyTimestamp}</div>}

//       <div className="bubble-container">
//         <div className="bubble" title={friendlyTimestamp}>
//           {data.message}
//         </div>
//       </div>
//     </div>
//   );
// }
