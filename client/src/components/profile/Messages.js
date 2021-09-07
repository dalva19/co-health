//components
import NavigationTabs from "./NavigationTabs";
import Chat from "../chat/Chat";

const Messages = () => {
  return (
    <>
      <NavigationTabs defaultActiveKey="/co-health/profile/messages" />
      <Chat />
    </>
  );
};

export default Messages;
