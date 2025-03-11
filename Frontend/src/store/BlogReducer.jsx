const BlogReducer = (currentState, action) => {
  switch (action.type) {
    case "SET_BLOG":
      return action.payload.blogs;
    case "ADD_BLOG":
      return [...currentState, action.payload.blog];
    case "DELETE_BLOG":
      return currentState.filter((blogs) => blogs._id !== action.payload.id);
    case "UPDATE_BLOG":
      return currentState.map((blog) =>
        blog._id === action.payload.blog._id ? action.payload.blog : blog
      );
    default:
      return currentState;
  }
};

export default BlogReducer;
