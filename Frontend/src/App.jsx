import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatProvider from "./store/ChatContext";

import Chat from "./components/Chat";

import ChatLayout from "./layout/ChatLayout";
function App() {
  return (
    <BrowserRouter>
      <ChatProvider>
        <Routes>
          <Route path="/" element={<ChatLayout />}>
            <Route path="/" element={<Chat />} />
            <Route path="/conversation/:id" element={<Chat />} />
          </Route>
        </Routes>
      </ChatProvider>
    </BrowserRouter>
  );
}

export default App;
