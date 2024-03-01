const { io } = require("../app");
require("dotenv").config();
const { handleUsersOnline } = require("./usersOnline");

const {
  handleLiked,
  handleCommented,
  handleFollowed,
} = require("./Notifications");


const ConnectSocket = async () => {
  try {
    io.on("connection", (socket) => {
      socket.on("addNewUser", (userId) => {
        handleUsersOnline(socket, userId);
      });

      socket.on("liked", (user, dataPubli) => {
        handleLiked(user, dataPubli);
      });

      socket.on("commented", (user, dataPubli) => {
        handleCommented(user, dataPubli);
      });

      socket.on("followed", (user, idFollowing) => {
        handleFollowed(user, idFollowing);
      });
    });
  } catch (error) {
    console.log("Falha ao conectar socket.io");
  }
};

module.exports = ConnectSocket;
