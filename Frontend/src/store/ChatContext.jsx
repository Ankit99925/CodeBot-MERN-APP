import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/");
        setChats(data.conversation);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addChat = (chat) => {
    setChats([...chats, chat]);
  };
  const deleteChat = (id) => {
    setChats(chats.filter((chat) => chat._id !== id));
  };

  const updateChat = (updatedChat) => {
    setChats(
      chats.map((chat) => (chat._id === updatedChat._id ? updatedChat : chat))
    );
  };

  return (
    <ChatContext.Provider value={{ chats, addChat, deleteChat, updateChat }}>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <div className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        children
      )}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
