const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  postID: { type: String, required: true },
  user_id: { type: String, required: true },
  name: { type: String, required: true },
  profileImage: { type: String, required: true },
  comment_like: Number,
});

const CommentModel = mongoose.model("comment", commentSchema);

module.exports = CommentModel;
