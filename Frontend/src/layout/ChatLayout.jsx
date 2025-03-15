import NavBar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const ChatLayout = () => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <NavBar />
        <div className="flex flex-row flex-grow">
          <Sidebar className="w-1/4 bg-gray-800 text-white" />
          <div className="flex-grow p-4 bg-gray-100 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatLayout;
