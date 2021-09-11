import React from "react";

import Contact from "./Contact";

const Contacts = ({
  contacts,
  selectContact,
  setSelectContact,
  chatOpen,
  setChatOpen,
  disconnectSocket,
  connectSocket,
}) => (
  <div className="contacts">
    {contacts.map((contact, i) => (
      <div key={i}>
        <Contact
          contact={contact}
          selectContact={setSelectContact}
          setSelectContact={setSelectContact}
          chatOpen={chatOpen}
          setChatOpen={setChatOpen}
          disconnectSocket={disconnectSocket}
          connectSocket={connectSocket}
        />
      </div>
    ))}
  </div>
);

export default Contacts;
