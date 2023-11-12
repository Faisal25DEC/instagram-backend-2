const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema(
  {
    members: { type: Array },
  },
  { timestamps: true }
);

const conversationModel = mongoose.model("conversations", conversationSchema);

module.exports = conversationModel;
