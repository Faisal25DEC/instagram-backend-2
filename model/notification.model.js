const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
  message: { type: String, required: true },
  seen: { type: Boolean, required: true },
  userId: { type: String, required: true },
});
const notificationModel = mongoose.model("notifications", notificationSchema);
module.exports = notificationModel;
