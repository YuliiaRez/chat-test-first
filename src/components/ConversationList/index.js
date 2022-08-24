import React, { useState, useEffect } from "react";
import ConversationSearch from "../ConversationSearch";
import ConversationListItem from "../ConversationListItem";
import Toolbar from "../Toolbar";
import ToolbarButton from "../ToolbarButton";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import { firestore } from "../../index";

import "./ConversationList.css";

export default function ConversationList(props) {
  const { chooseConvers, lastConvs } = props;
  // const [chats, setChats] = useState([]);
  const [contactsDb, setContactsDb] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  const searching = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    // const q = query(collection(firestore, "contactsDb"), orderBy("tsLastMess"));
    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //   let contactsAll = [];
    //   querySnapshot.forEach((doc) => {
    //     contactsAll.push({ ...doc.data(), id: doc.id });
    //   });

    //   setContactsDb(contactsAll);
    // });

    chooseConvers(lastConvs[0]);

    // return () => unsubscribe();
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
    console.log("lastConvs", lastConvs);
    console.log("contacts", contacts);
    console.log("search", search);

    return () => clearTimeout(Delay);
  }, [search]);
  return (
    <div className="conversation-list">
      <ConversationSearch onChanging={searching} search={search} />

      <Toolbar title="Chats" />
      {contacts.map((contact) => (
        <ConversationListItem
          // chatsDescOrder={chatsDescOrder}
          key={contact.userName}
          data={contact}
          onClick={chooseConvers}
        />
      ))}
    </div>
  );
}
