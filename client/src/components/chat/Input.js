import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getChatById } from "../../actions/chatActions";

const Input = ({ setMessage, sendMessage, message }) => {
  const chatId = useSelector((state) => state.chat.chats._id);
  const dispatch = useDispatch();

  const handleSendButton = (e) => {
    sendMessage(e);
    dispatch(getChatById(chatId));
  };

  return (
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMessage(event) : null
        }
      />
      <button className="sendButton" onClick={handleSendButton}>
        Send
      </button>
    </form>
  );
};

export default Input;
