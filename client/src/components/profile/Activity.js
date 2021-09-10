import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { disconnectChat } from "../../utilities/chatFunction";
//components
import NavigationTabs from "./NavigationTabs";

const Activity = () => {
  const { socket } = useSelector((state) => state.socket.socket);
  console.log("hello");

  // useEffect(() => {
  //   if (socket) {
  //     disconnectChat(socket);
  //   }
  // }, [socket]);

  return (
    <>
      <NavigationTabs defaultActiveKey="/co-health/profile/activity" />
      <h2>this is the activity page</h2>
    </>
  );
};

export default Activity;
