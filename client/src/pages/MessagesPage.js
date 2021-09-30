//components
import Chat from "../components/chat/Chat";
import NavigationTabs from "../components/nav/NavigationTabs";

const MessagesPage = ({ socketRef }) => {
  return (
    <>
      <NavigationTabs  defaultActiveKey="/profile/messages" />
      <Chat socketRef={socketRef} />
    </>
  );
};

export default MessagesPage;
