const express = require("express");
const { authentication } = require("../middlewares/authentication.middleware");
const notificationModel = require("../model/notification.model");
const UserModel = require("../model/user.model");

const notificationRouter = express.Router();

notificationRouter.get("/", authentication, async (req, res) => {
  try {
    const notifications = await notificationModel.find({ _id: req.userId });

    res.send(notifications);
  } catch (err) {
    res.status(500).send({ msg: "internal server error" });
  }
});

notificationRouter.post("/like", authentication, async (req, res) => {
  const { likedById } = req.body;
  try {
    const likedByUser = await UserModel.findOne({ _id: likedById });
    notificationModel.create({
      message: `your post is liked by ${likedByUser.name}`,
      seen: false,
      userId: req.userId,
    });
  } catch (err) {
    req.status(500).send({ msg: "internal server error" });
  }
});
notificationRouter.post("/follow", authentication, async (req, res) => {
  const { followedById } = req.body;
  try {
    const followedByUser = await UserModel.findOne({ _id: followedById });
    notificationModel.create({
      message: ` ${followedByUser.name} followed you`,
      seen: false,
      userId: req.userId,
    });
  } catch (err) {
    req.status(500).send({ msg: "internal server error" });
  }
});
notificationRouter.post("/comment", authentication, async (req, res) => {
  const { commentById } = req.body;
  try {
    const commentByUser = await UserModel.findOne({ _id: commentById });
    notificationModel.create({
      message: `${commentByUser.name} commented on your post`,
      seen: false,
      userId: req.userId,
    });
  } catch (err) {
    req.status(500).send({ msg: "internal server error" });
  }
});
notificationRouter.patch("/", authentication, async (req, res) => {
  try {
    notificationModel.updateMany({ seen: false }, { $set: { seen: true } });
  } catch (err) {
    req.status(500).send({ msg: "internal server error" });
  }
});

module.exports = notificationRouter;
