const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const UserSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    userName: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    description: {
      type: String,
    },
    address: {
      type: String,
    },
    links: {
      type: String,
    },

    followers: [
      {
        name: String,
        userName: String,
        id: mongoose.Schema.Types.ObjectId,
      },
    ],
    followings: [
      {
        name: String,
        userName: String,
        id: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
