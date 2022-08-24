import React, { useState, useEffect } from "react";
import { auth, firestore } from "../../index";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import axios from "axios";
import Notification from "../Notification";
import "./SendMessage.css";

const SendMessage = ({ scroll, currConvers /*, newEvent, setNewEvent*/ }) => {
  const [answer, setAnswer] = useState({ icon_url: "", answerValue: "" });
  const [input, setInput] = useState("");

  const getChuckAnswer = () => {
    axios.get("https://api.chucknorris.io/jokes/random").then((response) => {
      setAnswer({
        answerValue: response.data.value,
      });
    });
  };

  const createAnswerMessage = async () => {
    await addDoc(collection(firestore, String(currConvers.userId)), {
      text: answer.answerValue,
      messageId: Date.now(),
      userId: currConvers.userId,
      timestamp: serverTimestamp(),
      userName: currConvers.userName,
      userAvatar: currConvers.userAvatar,
      mine: false,
    });
  };
  useEffect(() => {
    setTimeout(() => {
      if (answer.answerValue !== "") createAnswerMessage();
    }, 5000);
  }, [answer]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      alert("Please enter a valid message");

      return;
    }
    const { uid } = auth.currentUser;
    await addDoc(collection(firestore, String(currConvers.userId)), {
      text: input,
      messageId: Date.now(),
      authId: uid,
      mine: true,
      timestamp: serverTimestamp(),
      userName: currConvers.userName,
      userAvatar: currConvers.userAvatar,
      userId: currConvers.userId,
    });

    setInput("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {" "}
      <form onSubmit={sendMessage} className="compose">
        <input
          value={input.trim()}
          onChange={(e) => setInput(e.target.value)}
          className="compose-input"
          type="text"
          placeholder="Message"
        />
        <button
          className="toolbar-button"
          onClick={() => {
            if (input.trim() !== "") getChuckAnswer();

            return <Notification answer={answer} />;
          }}
          type="submit"
        ></button>
      </form>
    </>
  );
};

export default SendMessage;
