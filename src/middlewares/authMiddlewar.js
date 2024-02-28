const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkToken = (req, res, next) => {

  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];

  if (!token) {
    return res.status(404).json({ msg: "Acesso negado" });
  }

  try {
    const SECRET = process.env.SECRET;

    const decoded = jwt.verify(token, SECRET);
    req.name = decoded.name
    req.userId = decoded.id
    req.userName = decoded.userName
    
    next();
  } catch (error) {
    res.status(400).json({ msg: "token invalido" });
}
};

module.exports = checkToken