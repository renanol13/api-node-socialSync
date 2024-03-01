
let usersOnline = [];

const handleUsersOnline = (socket, userId) => {
    const isUserOnline = usersOnline.find((people) => people.id === userId);
    if (!isUserOnline) {
      usersOnline.push({
        id: userId,
        socketId: socket.id,
      });
    } else {
      isUserOnline.socketId = socket.id;
    }
}

module.exports = { handleUsersOnline, usersOnline };
