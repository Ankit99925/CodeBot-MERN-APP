const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  model: { type: String, required: true, default: "gemini-1.5-flash" },
  startTime: { type: String, required: true, default: Date.now },
  messages: [
    {
      role: { type: String, required: true },
      content: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("Conversation", conversationSchema);
