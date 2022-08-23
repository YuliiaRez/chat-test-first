import React, { useEffect } from "react";

import moment from "moment";
import "./Message.css";
import { auth } from "../../index";

const Message = ({ message }) => {
  console.log("message", message);
  const messageClass = message.mine ? `message.mine` : ``;
  const friendlyTimestamp = moment(message.timestamp).format("LLLL");

  return (
    <div>
      <div className={`message ${messageClass} .bubble-container .bubble `}>
        {!message.mine && (
          <img
            className="conversation-photo"
            src={message.userAvatar}
            alt="conversation"
          />
        )}
        <div className="timestamp">{friendlyTimestamp}</div>
        <p>{message.text}</p>
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
