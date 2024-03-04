const  io  = require("../app");
const NotificationsModel = require("../models/notificationsModel");
const usersModel = require("../models/usersModel");

const { usersOnline } = require("./usersOnline");
const date = new Date();

const senderNotifications = async (user, dataPubli, type) => {
  try {
    let response;
    if (dataPubli.author === user.id) return;

    //Apenas notificações do tipo 'comentario' podem ser criadas mais de uma vez
    if (type !== 'commented') {
       response = await NotificationsModel.findOne({
        $and: [{ idPubli: dataPubli._id }, { id: user.id }],
      }); 
    }

    if (response) return;
    const newNotification = {
      ...user,
      author: dataPubli.author,
      idPubli: dataPubli._id,
      content: dataPubli.content,
      type: type,
      createdAt: date,
      isRead: false,
    };

    const recipient = usersOnline.find((res) => res.id === dataPubli.author);

    if (recipient) {
      io.to(recipient.socketId).emit("notifications", newNotification);
    }
    await NotificationsModel.create(newNotification);
  } catch (err) {
    console.log("deu erro: " + err);
  }
};

const handleLiked = (user, dataPubli) => {
  senderNotifications(user, dataPubli, "liked");
};

const handleCommented = (user, dataPubli) => {
  senderNotifications(user, dataPubli, "commented");
};

const handleFollowed = async (user, idFollowing) => {
  try {

    //verica se há uma noticação com as especificações passadas
    const response = await NotificationsModel.findOne({
      $and: [{ author: idFollowing }, { id: user.id }],
    });
    if (response) return;

    //verica se usuario ja segue
    const veriryIsFollowing = await usersModel.findById(user.id);
    const isFollowing = veriryIsFollowing.followings.find(
      (elm) => elm.id == idFollowing
    );
    if (isFollowing) return;

    const newNotification = {
      ...user,
      author: idFollowing,
      type: 'followed',
      createdAt: date,
      isRead: false,
    }

    //verifica se usuario estar online
    const recipient = usersOnline.find((res) => res.id === idFollowing);
    
    if (recipient) {
      io.to(recipient.socketId).emit("notifications", newNotification);
    }

    await NotificationsModel.create(newNotification);

  } catch (error) {
    console.log(error);
  }

};

module.exports = { handleLiked, handleCommented, handleFollowed };
