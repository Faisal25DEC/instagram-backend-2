const mongoose = require("mongoose");

const likesSchema = mongoose.Schema({
  blogId: { type: String, required: true },
  likes: { type: [String], required: true },
});

const LikesModel = mongoose.model("likes", likesSchema);

module.exports = LikesModel;
