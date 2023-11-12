const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
    senderImage: {
      type: String,
    },
  },
  { timestamps: true }
);

const messageModel = mongoose.model("Message", MessageSchema);

module.exports = messageModel;
