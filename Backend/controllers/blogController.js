const Blog = require("../models/model");
exports.getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({ status: "Success", blogs });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
 
};

exports.createBlog = async (req, res, next) => {
  const { title, content, author } = req.body;
  try {
    const blog = await Blog.create({ title, content, author });
    res.status(201).json({ status: "Success", blog });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.deleteBlog = async (req, res, next) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findByIdAndDelete(id);
    res.status(200).json({ status: "Success", blog });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// exports.updateBlog = async (req, res, next) => {
//   const { id } = req.params;
//   const { title, content, author } = req.body;
//   try {
//     const blog = await Blog.findByIdAndUpdate(
//       { _id: id },
//       { title, content, author },
//       { new: true }
//     );
//     res.status(200).json({ status: "Success", blog });
//   } catch (e) {
//     res.status(500).json({ message: e.message });
//   }
// };

exports.likeBlog = async (req, res, next) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(404).json({ message: "Blog not found" });
    }
    blog.likes += 1;
    await blog.updateOne(blog);
    res.status(200).json({ status: "Success", blog });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.commentBlog = async (req, res, next) => {
  const { id } = req.params;
  const { username, comment } = req.body;
  try {
    const blog = await Blog.findById(id);
    if (!blog || !username || !comment) {
      res.status(404).json({ message: "Blog not found" });
    }
    blog.comments.push({ username, comment });
    await blog.updateOne(blog);
    res.status(200).json({ status: "Success", blog });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
