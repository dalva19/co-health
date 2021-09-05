import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
//components
import NavigationTabs from "./NavigationTabs";
//stylind
import { InputGroup, FormControl } from "react-bootstrap";

const socket = io.connect("http://localhost:8000"); //add process.env.PORT for when on heroku?

const Messages = () => {
  const { username } = useSelector((state) => state.member.member);

  const [state, setState] = useState({ message: "", username: username });
  //add chatlog from db??
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("message", ({ username, message }) => {
      setChat([...chat, { username, message }]);
    });
  });

  //helper fxns
  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const { username, message } = state;
    socket.emit("message", { username, message });
    setState({ message: "", username });
  };

  //add db chat and new messages
  const renderChat = () => {
    return chat.map(({ username, message }, index) => (
      <div key={index}>
        <h3>
          {username}: <span>{message}</span>
        </h3>
      </div>
    ));
  };

  return (
    <>
      <NavigationTabs defaultActiveKey="/co-health/profile/messages" />
      <div>
        <form onSubmit={onMessageSubmit}>
          <h1>Messenger</h1>

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
