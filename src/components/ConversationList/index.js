import React, { useState, useEffect } from "react";
import ConversationSearch from "../ConversationSearch";
import ConversationListItem from "../ConversationListItem";
import Toolbar from "../Toolbar";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import { firestore } from "../../index";
import { initialContacts } from "../Messanger/initial";

import "./ConversationList.css";

export default function ConversationList(props) {
  const { chooseConvers, currConvers } = props;
  // const [contactsInDb, setContactsInDb] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [lastConvs, setlastConvs] = useState(initialContacts);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(
      collection(firestore, `${currConvers.userId}`),
      orderBy("timestamp")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
      setMessages(items);
      let arr = [...lastConvs.filter((it) => it.userId !== currConvers.userId)];
      arr.unshift(items[items.length - 1]);
      setlastConvs(arr);
    });
    setContacts(lastConvs);

    return () => unsubscribe();
  }, [currConvers, messages.length]);

  const searching = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    chooseConvers(lastConvs[0]);
  }, []);

  const filterContacts = (searchText, contacts) => {
    if (!searchText.trim()) {
      return contacts;
    } else {
      return contacts.filter(({ userName }) =>
        userName.toLowerCase().includes(searchText.toLowerCase())
      );
    }
  };
  useEffect(() => {
    const Delay = setTimeout(() => {
      const filteredContacts = filterContacts(search, lastConvs);
      setContacts(filteredContacts);
    }, 300);
    return () => clearTimeout(Delay);
  }, [search]);
  return (
    <div className="conversation-list">
      <ConversationSearch onChanging={searching} search={search} />

      <div className="chats">Chats</div>
      {contacts.map((contact, index) => (
        <ConversationListItem
          key={index}
          data={contact}
          onClick={chooseConvers}
          setSearch={setSearch}
        />
      ))}
    </div>
  );
}
