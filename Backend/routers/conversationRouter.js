const express = require("express");
const conversationRouter = express.Router();

const conversationController = require("../controllers/conversationController");

conversationRouter.get("/", conversationController.getConversation);
conversationRouter.post(
  "/conversation",
  conversationController.newConversation
);
conversationRouter.put("/conversation/:id", conversationController.newMessage);
conversationRouter.delete(
  "/conversation/:id",
  conversationController.deleteConversation
);

module.exports = conversationRouter;
