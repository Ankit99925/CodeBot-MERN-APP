import React, { createContext, useReducer } from "react";
import BlogReducer from "./BlogReducer";
export const BlogContext = createContext();

const BlogProvider = ({ children }) => {
  const [blogs, dispatch] = useReducer(BlogReducer, []);

  const setBlogs = (blogs) => {
    dispatch({ type: "SET_BLOG", payload: blogs });
  };

  const addBlog = (blog) => {
    dispatch({
      type: "ADD_BLOG",
      payload: {
        blog,
      },
    });
  };

  const deleteBlog = (id) => {
    dispatch({ type: "DELETE_BLOG", payload: { id } });
  };
  const updateBlog = (blog) => {
    dispatch({ type: "UPDATE_BLOG", payload: blog });
  };

  return (
    <BlogContext.Provider
      value={{ blogs, addBlog, deleteBlog, updateBlog, setBlogs }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default BlogProvider;
