import React, { useState, useEffect } from "react";
import { auth, firestore } from "../../index";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import axios from "axios";
import Notification from "../Notification";

const SendMessage = ({ scroll, currConvers }) => {
  const [answer, setAnswer] = useState({ icon_url: "", answerValue: "" });
  const [input, setInput] = useState("");

  const getChuckAnswer = () => {
    axios.get("https://api.chucknorris.io/jokes/random").then((response) => {
      setAnswer({
        icon_url: response.data.icon_url,
        answerValue: response.data.value,
        name: currConvers.userName,
      });
    });
  };

  const createAnswerMessage = async () => {
    await addDoc(collection(firestore, "messagesDb"), {
      text: answer.answerValue,
      messageId: Date.now(),
      userId: currConvers.userId,
      timestamp: serverTimestamp(),
    });
  };
  useEffect(() => {
    setTimeout(() => {
      if (answer.answerValue !== "") createAnswerMessage();
    }, 4000);
  }, [answer]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") {
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
    <>
      {" "}
      <form
        onSubmit={
          sendMessage
          // getChuckAnswer();
        } /*className={style.form}*/
      >
        <input
          value={input.trim()}
          onChange={(e) => setInput(e.target.value)}
          // className={style.input}
          type="text"
          placeholder="Message"
        />
        <button
          /* className={style.button} */
          onClick={() => {
            if (input.trim() !== "") getChuckAnswer();
            return <Notification answer={answer} />;
          }}
        >
          Send
        </button>
      </form>
    </>
  );
};

export default SendMessage;
