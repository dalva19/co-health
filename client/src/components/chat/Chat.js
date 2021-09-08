import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import Messages from "./Messages";
import InfoBar from "./InfoBar";
import Input from "../chat/Input";
import { getChat } from "../../actions/chatActions";
import { getContact } from "../../actions/contactAction";

const dummyData = [
  {
    healthcareMember: {
      _id: "6132b468fad052ba8ee058cc",
      username: "nurse1",
      profileType: "healthcare member",
      name: {},
      avatar: null,
      address: {
        zipcode: "NaN",
      },
      credentials: {
        liscence: null,
        liscenceNumber: null,
        verified: true,
      },
      requests: [],
      offers: [
        {
          _id: "613632aab851e10378af64b9",
          text: "i can help",
          username: "nurse1",
          user: "6132b468fad052ba8ee058cc",
          request: "61363152b851e10378af64a7",
          status: "offer accepted",
          date: "2021-09-06T15:24:26.021Z",
          __v: 0,
        },
      ],
    },
    commMember: {
      _id: "613630c2b851e10378af64a0",
      username: "comm1",
      profileType: "community member",
      name: {},
      avatar: null,
      address: {
        zipcode: "NaN",
      },
      credentials: {
        liscence: null,
        liscenceNumber: null,
        verified: true,
      },
      requests: [
        {
          _id: "61363152b851e10378af64a7",
          text: "this is a request",
          username: "comm1",
          user: "613630c2b851e10378af64a0",
          offers: ["613632aab851e10378af64b9"],
          status: "offer accepted",
          date: "2021-09-06T15:18:42.962Z",
          __v: 1,
          acceptedOffer: "613632aab851e10378af64b9",
        },
        {
          _id: "613647bf610efbb31df0b258",
          text: "changing the text",
          username: "comm1",
          user: "613630c2b851e10378af64a0",
          offers: [],
          status: "awaiting offer",
          date: "2021-09-06T16:54:23.253Z",
          __v: 0,
        },
        {
          _id: "613648f28ac96f992eba0704",
          text: "i need some help with my meds",
          username: "comm1",
          user: "613630c2b851e10378af64a0",
          offers: [],
          status: "awaiting offer",
          date: "2021-09-06T16:59:30.844Z",
          __v: 0,
        },
        {
          _id: "6136492d10a648e8afbe8044",
          text: "i need some help with my meds and dinner",
          username: "comm1",
          user: "613630c2b851e10378af64a0",
          offers: [],
          status: "awaiting offer",
          date: "2021-09-06T17:00:29.434Z",
          __v: 0,
        },
      ],
      offers: [],
    },
    request: {
      _id: "61363152b851e10378af64a7",
      text: "this is a request",
      username: "comm1",
      user: "613630c2b851e10378af64a0",
      offers: [
        {
          _id: "613632aab851e10378af64b9",
          text: "i can help",
          username: "nurse1",
          user: "6132b468fad052ba8ee058cc",
          request: "61363152b851e10378af64a7",
          status: "offer accepted",
          date: "2021-09-06T15:24:26.021Z",
          __v: 0,
        },
      ],
      status: "offer accepted",
      date: "2021-09-06T15:18:42.962Z",
      __v: 1,
      acceptedOffer: "613632aab851e10378af64b9",
    },
    offers: {
      _id: "613632aab851e10378af64b9",
      text: "i can help",
      username: "nurse1",
      user: "6132b468fad052ba8ee058cc",
      request: "61363152b851e10378af64a7",
      status: "offer accepted",
      date: "2021-09-06T15:24:26.021Z",
      __v: 0,
    },
  },
];

const ENDPOINT = "http://localhost:8000";

let socket;

const Chat = () => {
  // const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [connectId, setConnectId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { username, profileType, _id } = useSelector(
    (state) => state.member.member
  );
  const { chatLog } = useSelector((state) => state.chat.chats);
  const chatId = useSelector((state) => state.chat.chats._id);
  const { loaded } = useSelector((state) => state.chat);

  const dispatch = useDispatch();

  useEffect(() => {
    setRoom("chat");

    if (loaded) {
      setMessages([...chatLog]);
      setConnectId(chatId);
    }
  }, [chatLog, loaded, chatId]);

  const handleJoin = () => {
    socket = io(ENDPOINT);
    //add logic to match users based on user's chat log
    //click on contact and bring up chat
    let body;
    // dispatch(getContact("6132b468fad052ba8ee058cc"));

    if (profileType === "community member") {
      body = {
        communityMember: _id,
        healthcareMember: "6132b468fad052ba8ee058cc",
      };
    } else if (profileType === "healthcare member") {
      body = {
        communityMember: "613630c2b851e10378af64a0",
        healthcareMember: _id,
      };
    }

    dispatch(getChat(body));
  };

  useEffect(() => {
    if (chatId) {
      socket.emit("join", { username, room, chatId }, (error) => {
        if (error) {
          console.log(error);
        }
      });

      socket.on("message", (message) => {
        setMessages([...messages, message]);
      });
    }
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();

    const log = {
      message: message,
      username: username,
    };

    if (message) {
      socket.emit("sendMessage", log, () => setMessage(""));
    }
  };

  //add contacts component that lists all contacts based on 2 users being matched
  return (
    <div className="outerContainer">
      <button onClick={handleJoin}>Join</button>
      <div className="container">
        <h1>this is where chats go</h1>
        <InfoBar room={room} />
        <Messages messages={messages} username={username} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
