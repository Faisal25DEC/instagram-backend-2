const { default: mongoose } = require("mongoose");

const followerSchema = mongoose.Schema(
  {
    followedBy: {
      type: String,
      required: true,
    },
    followedTo: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const FollowerModel = mongoose.model("instagram_follower", followerSchema);
module.exports = FollowerModel;