import React from "react";

function ConversationCurrent(props) {
  const { currConvers } = props;

  return <div>{currConvers.userName}</div>;
}

export default ConversationCurrent;
