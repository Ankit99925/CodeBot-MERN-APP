import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-2xl">FullStack Blog</h1>
      <div className="flex space-x-4">
        <Link to="/">Home</Link>
        <Link to="/create">New Blog</Link>
      </div>
    </nav>
  );
};

export default NavBar;
