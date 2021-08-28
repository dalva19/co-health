import React from "react";
//components
import NavigationTabs from "./NavigationTabs";

const Activity = () => {
  //loads with profile info based on who is logged in
  return (
    <>
      <NavigationTabs defaultActiveKey="/co-health/profile/activity" />
      <h2>this is the activity page</h2>
    </>
  );
};

export default Activity;
