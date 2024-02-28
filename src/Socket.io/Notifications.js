const usersOnline = require('./usersOnline')


const handleLiked = (socket, user) => {

    socket.on('liked', (dataPubli) => {
      const recipient = usersOnline.find((res) => res.id === dataPubli.author);
  
      if (recipient) {
        console.log(recipient);
        io.to(recipient.socketId).emit('notificationLike', [
          user,
          {
            id: dataPubli.id,
            content: dataPubli.content,
          },
        ]);
      }
    });
};
  
const handleFollowed = (socket) => {
    socket.on('followed', (idFollowing) => {
      // Lógica para lidar com o evento "followed"
    });
};
  
module.exports = {handleLiked, handleFollowed}