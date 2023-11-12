const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema(
  {
    profileImage: {
      type: String,
    },
    userName: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    bio: {
      type: String
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    followerCount: Number,
    followingCount: Number,
    postCount: Number,
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("instagram_users", userSchema);
module.exports = UserModel;
