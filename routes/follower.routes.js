const express = require("express");
const FollowerModel = require("../model/follower.model");
const { authentication } = require("../middlewares/authentication.middleware");
const UserModel = require("../model/user.model");

const followerRouter = express.Router();

followerRouter.get("/:profile_id", async (req, res) => {
  try {
    const { profile_id } = req.params;
    const follower = await FollowerModel.find({ followedTo: profile_id });
    const following = await FollowerModel.find({ followedBy: profile_id });
    // [{}, {}]
    // ["ids","ids","ids"]
    const userFollowers = follower.map((ele) => ele.followedBy);
    const userFollowingIds = following.map((ele) => ele.followedTo);
    const userFollowersDetail = await UserModel.find({
      _id: { $in: userFollowers },
    });
    const userFollowsToDetail = await UserModel.find({
      _id: { $in: userFollowingIds },
    });

    res.json({
      followers: userFollowersDetail,
      following: userFollowsToDetail,
      userFollowingIds,
    });
  } catch (error) {
    console.log(error);
  }
});

followerRouter.post("/:profile_id", authentication, async (req, res) => {
  try {
    const userId = req.userId;
    const { profile_id } = req.params;
    const follower = await FollowerModel.create({
      followedBy: userId,
      followedTo: profile_id,
    });
    res.send({ msg: "followed" });
  } catch (error) {
    console.log(error);
  }
});

followerRouter.delete("/:profile_id", authentication, async (req, res) => {
  try {
    const userId = req.userId;
    const { profile_id } = req.params;
    const follower_delete = await FollowerModel.deleteOne({
      followedBy: userId,
      followedTo: profile_id,
    });

    res.send({
      message: "follower removed",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = followerRouter;
