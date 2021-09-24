import React from "react";
import Contact from "./Contact";

const Contacts = ({
  contacts,
  setSelectContact,
  chatOpen,
  setChatOpen,
  disconnectSocket,
  connectSocket,
  leaveChatRoom,
  resetChat,
}) => (
  <div className="contacts">
    {contacts.map((contact, i) => (
      <div key={i}>
        <Contact
          contact={contact}
          setSelectContact={setSelectContact}
          chatOpen={chatOpen}
          setChatOpen={setChatOpen}
          leaveChatRoom={leaveChatRoom}
          resetChat={resetChat}
        />
      </div>
    ))}
  </div>
);

export default Contacts;
