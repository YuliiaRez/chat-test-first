import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDjjkh_lMD636n2sXnaOQcvyKtWPdEHwAo",
  authDomain: "chat-test-cdf26.firebaseapp.com",
  projectId: "chat-test-cdf26",
  storageBucket: "chat-test-cdf26.appspot.com",
  messagingSenderId: "788245263002",
  appId: "1:788245263002:web:d9b778adfb43556a1f2523",
  measurementId: "G-038VSVRC90",
};

export const Context = createContext(null);

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Context.Provider
      value={{
        auth,
        firestore,
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Context.Provider>
  </React.StrictMode>
);
