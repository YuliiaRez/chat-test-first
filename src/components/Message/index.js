import React, { useEffect } from "react";
import { format } from "date-fns";

import "./Message.css";

const Message = ({ message }) => {
  const messageClass = message.mine ? `message.mine` : ``;
  // const friendlyTimestamp = format(message.timestamp.toDate(), "Pp");

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
        <div className="timestamp">Date</div>
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
