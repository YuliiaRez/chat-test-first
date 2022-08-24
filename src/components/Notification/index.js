/*import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { requestForToken, onMessageListener } from "../../index";*/

/*const Notification = ({ answer }) => {
  const [notification, setNotification] = useState({ title: "", body: "" });
  const notify = () => toast(<ToastDisplay />);
  function ToastDisplay() {
    return (
      <div>
        <p>
          <b>{notification?.title}</b>
        </p>
        <p>{notification?.body}</p>
      </div>
    );
  }

  useEffect(() => {
    if (notification?.title) {
      notify();
    }
  }, [notification]);

  requestForToken();

  onMessageListener()
    .then((answe) => {
      setNotification({
        title: answer.name,
        body: answer.answerValue,
      });
    })
    .catch((err) => console.log("failed: ", err));

  return <Toaster />;
};

export default Notification;*/
