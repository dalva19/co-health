import React from "react";

import Contact from "./Contact";

// import "./Messages.css";

const Contacts = ({ contacts, selectContact, setSelectContact }) => (
  <div className="contacts">
    {contacts.map((contact, i) => (
      <div key={i}>
        <Contact
          contact={contact}
          selectContact={setSelectContact}
          setSelectContact={setSelectContact}
        />
      </div>
    ))}
  </div>
);

export default Contacts;
