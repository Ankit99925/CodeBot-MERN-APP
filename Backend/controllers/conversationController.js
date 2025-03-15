const { generateContent } = require("../service/GeminiService");
const { generateTitle } = require("../service/GeminiService");
const Conversation = require("../models/conversationModel");

exports.getConversation = async (req, res) => {
  const conversation = await Conversation.find();
  res.status(201).json({ conversation });
};

exports.newConversation = async (req, res) => {
  const { prompt, model } = req.body;
  const content = await generateContent(prompt, model);
  const messages = [
    { role: "User", content: prompt },
    { role: "AI", content: content },
  ];
  const title = await generateTitle(messages);
  const conversation = new Conversation({
    title,
    model,
    messages,
  });
  await conversation.save();
  res.status(201).json({ conversation });
};

exports.newMessage = async (req, res, next) => {
  const { id } = req.params;
  const { prompt, model } = req.body;
  const conversation = await Conversation.findById(id);
  if (!conversation) {
    res.status(404).json({ message: "NOT FOUND" });
  }
  const content = await generateContent(prompt, model, conversation.messages);
  conversation.messages.push({ role: "User", content: prompt });
  conversation.messages.push({ role: "AI", content: content });
  await conversation.save();
  res.json({ conversation });
};
exports.deleteConversation = async (req, res, next) => {
  const { id } = req.params;

  const conversation = await Conversation.findById(id);
  if (!conversation) {
    res.status(404).json({ message: "NOT FOUND" });
  }
  await Conversation.deleteOne({ _id: id });
  res.status(200).json({ message: "Conversation Deleted Successfully " });
};
