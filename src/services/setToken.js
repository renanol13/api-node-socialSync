const jwt = require("jsonwebtoken");

const setToken = (isUser) => {
  const SECRET = process.env.SECRET;
  const token = jwt.sign(
    {
      id: isUser._id,
      name: isUser.name,
      userName: isUser.userName
    },
    SECRET
  );

  return token
  
};

module.exports = setToken;
