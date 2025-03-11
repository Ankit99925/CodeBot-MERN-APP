const express = require("express");
const blogRouter = express.Router();

const blogController = require("../controllers/blogController");

blogRouter.get("/blogs", blogController.getBlogs);
blogRouter.post("/blogs", blogController.createBlog);
blogRouter.delete("/blogs/:id", blogController.deleteBlog);
// blogRouter.patch("/blogs/:id", blogController.updateBlog);
blogRouter.put("/blogs/:id/like", blogController.likeBlog);
blogRouter.put("/blogs/:id/comment", blogController.commentBlog);

module.exports = blogRouter;
