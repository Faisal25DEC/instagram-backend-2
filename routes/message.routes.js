const messageModel = require("../model/message.model");
const UserModel = require("../model/user.model");

const messageRouter = require("express").Router();

//add

messageRouter.get("/", (req, res) => {
  res.send({ msg: "Message Router Basic Endpoint" });
});

messageRouter.post("/", async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.sender);
    const newMessage = await messageModel.create({
      ...req.body,
      senderImage: user.profileImage,
    });
    res.status(200).json(newMessage);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//get

messageRouter.get("/:conversationId", async (req, res) => {
  try {
    const messages = await messageModel.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = messageRouter;
