import { useContext } from "react";
import { ChatContext } from "../store/ChatContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const Sidebar = () => {
  const { chats, deleteChat } = useContext(ChatContext);
  const navigate = useNavigate();

  const handleNewChat = () => {
    navigate("/");
  };

  const handleDeleteChat = async (id) => {
    await axios.delete(`http://localhost:3000/api/conversation/${id}`);
    deleteChat(id);
  };

  return (
    <div className="h-full bg-gray-900 text-white p-6 flex flex-col">
      <div className="mb-6 text-xl font-bold">Convos</div>
      <button
        onClick={handleNewChat}
        className="w-full mb-6 p-3 bg-blue-600 rounded-lg hover:bg-blue-800"
      >
        New Chat
      </button>
      <div className="flex-grow overflow-y-auto space-y-4">
        {chats.map((chat) => (
          <div key={chat._id} className="relative group">
            <Link to={`/conversation/${chat._id}`}>
              <div className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600">
                {chat.title}
              </div>
            </Link>
            <button
              onClick={() => handleDeleteChat(chat._id)}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
