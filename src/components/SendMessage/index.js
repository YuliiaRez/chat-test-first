import React, { useState } from "react";
import { auth, firestore } from "../../index";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const SendMessage = ({ scroll }) => {
  const [input, setInput] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();

    if (input === "") {
      alert("Please enter a valid message");
      return;
    }

    const { uid, displayName } = auth.currentUser;
    console.log("uid, displayname", uid, displayName);
    await addDoc(collection(firestore, "messagesDb"), {
      text: input,
      messageId: Date.now(),
      userId: uid,
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
