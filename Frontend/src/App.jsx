import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import BlogProvider from "./store/BlogContext";
import Home from "./components/Home";
import CreateBlog from "./components/CreateBlog";
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <BlogProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateBlog />} />
        </Routes>
      </BlogProvider>
    </BrowserRouter>
  );
}

export default App;
