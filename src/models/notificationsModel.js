const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const notificationSchema = new Schema({
  id: { type: String, required: true },
  userName: { type: String, required: true },
  name: { type: String, required: true },
  author: { type: String, required: true },
  idPubli: { type: String },
  content: { type: String },
  type: { type: String, required: true },
  createdAt: { type: Date, required: true },
  isRead: { type: Boolean, required: true },
});

const NotificationsModel = mongoose.model("Notifications", notificationSchema);

module.exports = NotificationsModel;
