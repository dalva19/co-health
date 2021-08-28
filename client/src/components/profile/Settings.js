import React from "react";
//components
import NavigationTabs from "./NavigationTabs";

const Settings = () => {
  //loads with profile info based on who is logged in
  return (
    <>
      <NavigationTabs defaultActiveKey="/co-health/profile/settings" />
      <h2>this is the settings page</h2>
    </>
  );
};

export default Settings;
