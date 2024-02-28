const { io } = require("../app");
require("dotenv").config();
// const usersOnline = require("./usersOnline");
const { handleLiked } = require("./Notifications");

const usersOnline = [];
const date = new Date();
let user;

const senderNotifications = (dataPubli, type) => {
  const recipient = usersOnline.find((res) => res.id === dataPubli.author);
  
  if (recipient) {
    io.to(recipient.socketId).emit("notifications", {
      ...user,
      idPubli: dataPubli._id,
      content: dataPubli.content,
      type: type,
      createdAt: date,
      isRead: false,
    });
  }
};

const ConnectSocket = async () => {
  try {
    io.on("connection", (socket) => {
      const { userString } = socket.handshake.query;
     user = JSON.parse(userString);

      socket.on("addNewUser", () => {
        const isUserOnline = usersOnline.find(
          (people) => people.id === user?.id
        );
        if (!isUserOnline) {
          usersOnline.push({
            id: user?.id,
            socketId: socket.id,
          });
        } else {
          isUserOnline.socketId = socket.id;
        }
      });

      socket.on("liked", (dataPubli) => {
        senderNotifications(dataPubli, "liked");
      });

      socket.on("commented", (dataPubli) => {
        senderNotifications(dataPubli, "commented");
      });
    });
  } catch (error) {
    console.log("Falha ao conectar socket.io");
  }
};

module.exports = ConnectSocket;
