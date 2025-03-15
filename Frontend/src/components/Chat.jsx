import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChatContext } from "../store/ChatContext";
import ReactMarkdown from "react-markdown";
import axios from "axios";

const Chat = () => {
  const { id } = useParams();
  const { chats, addChat, updateChat } = useContext(ChatContext);
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const convoRef = useRef();
  const modelRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setChat(chats.find((chat) => chat._id === id));
    } else {
      setChat(null);
    }
  }, [id, chats]);

  const handleNewConvo = (e) => {
    e.preventDefault();
    setLoading(true);
    const fetchData = async () => {
      const url = id
        ? `https://codebot-mern-app-backend.onrender.com/conversation/${id}`
        : "https://codebot-mern-app-backend.onrender.com/api/conversation/";
      const method = id ? "put" : "post";
      try {
        const { data } = await axios[method](url, {
          prompt: convoRef.current.value,
          model: modelRef.current.value,
        });
        setChat(data.conversation);
        if (id) {
          updateChat(data.conversation);
        } else {
          addChat(data.conversation);
        }

        navigate(`/conversation/${data.conversation._id}`);
        convoRef.current.value = "";
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  };

  return (
    <div className="flex flex-col h-full p-6 bg-white rounded-lg shadow-lg">
      {chat ? (
        <div className="text-2xl font-semibold mb-6">{chat.title}</div>
      ) : (
        <div className="text-2xl font-semibold mb-6">What on Your Mind</div>
      )}
      {chat ? (
        <div className="flex-grow overflow-y-auto mb-6">
          {chat.messages.map((msg) => (
            <div
              key={msg._id}
              className={`p-4 mb-4 rounded-lg max-w-lg break-words ${
                msg.role === "User"
                  ? "bg-gray-200 text-black self-start"
                  : "bg-blue-500 text-white self-end"
              }`}
            >
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-grow overflow-y-auto mb-6">No messages</div>
      )}

      <form onSubmit={handleNewConvo} className="flex flex-col space-y-4">
        <input
          type="text"
          name="prompt"
          ref={convoRef}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Type your message..."
        />

        <select
          ref={modelRef}
          name="model"
          id="model"
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="gemini-1.5-flash-8b">Gemini 8B</option>
          <option value="gemini-1.5-flash">Gemini Flash</option>
          <option value="gemini-2.0-flash">Gemini PRO</option>
        </select>

        <button
          type="submit"
          className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
