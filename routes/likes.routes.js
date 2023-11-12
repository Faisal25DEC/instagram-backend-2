const express = require("express");

const LikesModel = require("../model/likes.model");
const { authentication } = require("../middlewares/authentication.middleware");

const likesRouter = express.Router();

const checkLikes = async (req, res, next) => {
  const { blogId } = req.params;
  const likes = await LikesModel.findOne({ blogId });
  if (!likes) {
    await LikesModel.create({ blogId, likes: [] });
  }
  next();
};

likesRouter.get("/:blogId", checkLikes, async (req, res) => {
  try {
    const { blogId } = req.params;
    const likes = await LikesModel.findOne({ blogId });
    res.send(likes.likes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ msg: "internal server error" });
  }
});

likesRouter.use(authentication);

likesRouter.patch("/like/:blogId", checkLikes, async (req, res) => {
  try {
    const { blogId } = req.params;
    const likes = await LikesModel.findOneAndUpdate(
      { blogId },
      { $push: { likes: req.userId } },
      { new: true }
    );
    res.send(likes);
  } catch (error) {
    res.status(500).send({ msg: "internal server error" });
  }
});
likesRouter.patch("/unlike/:blogId", checkLikes, async (req, res) => {
  try {
    const { blogId } = req.params;
    const likes = await LikesModel.findOneAndUpdate(
      { blogId },
      { $pull: { likes: req.userId } },
      { new: true }
    );
    res.send(likes.likes);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "internal server error" });
  }
});

module.exports = likesRouter;
