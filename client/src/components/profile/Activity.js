import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { disconnectChat } from "../../utilities/chatFunction";
import NavigationTabs from "../nav/NavigationTabs";
//components

const Activity = () => {
  // const { socket } = useSelector((state) => state.socket.socket);
  // console.log("hello");

  // useEffect(() => {
  //   if (socket) {
  //     disconnectChat(socket);
  //   }
  // }, [socket]);

  return (
    <>
      <NavigationTabs />
      <h2>this is the activity page</h2>
    </>
  );
};

export default Activity;
