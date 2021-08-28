import React from "react";
//components
import NavigationTabs from "./NavigationTabs";

const Messages = () => {
  //loads with profile info based on who is logged in
  return (
    <>
      <NavigationTabs defaultActiveKey="/co-health/profile/messages" />
      <h2>this is the messages page</h2>
    </>
  );
};

export default Messages;
