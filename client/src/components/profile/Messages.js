import { useState, useEffect } from "react";
import io from "socket.io-client";
import { InputGroup, FormControl } from "react-bootstrap";
//components
import NavigationTabs from "./NavigationTabs";

const socket = io.connect("http://localhost:8000");

const Messages = () => {
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
  });

  //helper fxns
  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const { name, message } = state;
    socket.emit("message", { name, message });
    setState({ message: "", name });
  };

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ));
  };

  //loads with profile info based on who is logged in
  return (
    <>
      <NavigationTabs defaultActiveKey="/co-health/profile/messages" />
      <div>
        <form onSubmit={onMessageSubmit}>
          <h1>Messenger</h1>
          <div className="name-field">
            <InputGroup className="mb-3">
              <InputGroup.Text>Name</InputGroup.Text>
              <FormControl
                aria-label="Name"
                name="name"
                onChange={(e) => onTextChange(e)}
                value={state.name}
              />
            </InputGroup>
          </div>

          <div>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Message</InputGroup.Text>
              <FormControl
                aria-label="Message"
                name="message"
                onChange={(e) => onTextChange(e)}
                value={state.message}
              />
            </InputGroup>
          </div>

          <button>Send</button>
        </form>

        <div className="render-chat">
          <h1>Chat Log</h1>
          {renderChat()}
        </div>
      </div>
    </>
  );
};

export default Messages;
