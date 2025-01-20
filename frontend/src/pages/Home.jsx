import Sidebar from "../Components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import { useChat } from "../store/useChatStore";
import Navbar from "../Components/Navbar";
import ChatContainer from "../Components/ChatContainer";
const HomePage = () => {
  const { selectedUser } = useChat();

  return (
    <div className="h-screen bg-base-200">
      <Navbar />
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
