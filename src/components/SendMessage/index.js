import React, { useState } from "react";
import { auth, firestore } from "../../index";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import axios from "axios";

const SendMessage = ({ scroll }) => {
  const [answer, setAnswer] = useState({ icon_url: "", answerValue: "" });
  const getChuckAnswer = () => {
    setTimeout(() => {
      axios.get("https://api.chucknorris.io/jokes/random").then((response) => {
        console.log("response", response.data.value);
        setAnswer({
          icon_url: response.data.icon_url,
          answerValue: response.data.value,
        });
      });
    }, 3000);
  };

  const [input, setInput] = useState("");
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
      userId: uid,
      timestamp: serverTimestamp(),
    });

    setInput("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form
      onSubmit={
        sendMessage
        // getChuckAnswer();
      } /*className={style.form}*/
    >
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        // className={style.input}
        type="text"
        placeholder="Message"
      />
      <button
        /* className={style.button} */ type="submit"
        onClick={getChuckAnswer}
      >
        Send
      </button>
    </form>
  );
};

export default SendMessage;
