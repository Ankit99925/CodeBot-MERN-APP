import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center p-6 bg-gray-900 text-white shadow-lg">
      <h1 className="text-3xl font-bold">Coding BOT Powered By GEMINI</h1>
      <div className="flex space-x-6"></div>
    </nav>
  );
};

export default NavBar;
