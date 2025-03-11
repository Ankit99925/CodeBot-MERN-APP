import { useContext } from "react";
import { BlogContext } from "../store/BlogContext";
import Blogs from "./Blog";

const BlogList = () => {
  const { blogs } = useContext(BlogContext);

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog._id}>
          <Blogs blog={blog} />
        </div>
      ))}
    </div>
  );
};

export default BlogList;
