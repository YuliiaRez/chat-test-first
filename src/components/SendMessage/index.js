import React, { useState } from "react";
import axios from "axios";

import { auth, firestore } from "../../index";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const SendMessage = ({ scroll, currConvers }) => {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState({ icon_url: "", answerValue: "" });
  const getAnswer = () => {};
  const sendMessage = async (e) => {
    e.preventDefault();

    if (input === "") {
      alert("Please enter a valid message");
      return;
    }

    const { uid, displayName } = auth.currentUser;
    await addDoc(collection(firestore, "messagesDb"), {
      text: input,
      messageId: Date.now(),
      userId: currConvers.userId,
      timestamp: serverTimestamp(),
    });

    setInput("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form onSubmit={sendMessage} /*className={style.form}*/>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        // className={style.input}
        type="text"
        placeholder="Message"
      />
      <button /* className={style.button} */ type="submit">Send</button>
    </form>
  );
};

export default SendMessage;
