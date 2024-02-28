const router = require("express").Router();
const userController = require("../controllers/userController");
const friendsController = require("../controllers/friendsControllers");
const checkToken = require("../middlewares/authMiddlewar");

router
  .post("/register", (req, res) => userController.Register(req, res))
  .post("/login", (req, res) => userController.Login(req, res))
  .get("/search/:name", checkToken, (req, res) =>
    userController.FindSearch(req, res)
  )
  .get("/friends/:name", checkToken, (req, res) =>
    friendsController.FindFriends(req, res)
  )
  .get("/:name", checkToken, (req, res) => userController.FindName(req, res))
  .patch("/edit/user", checkToken, (req, res) =>
    userController.Update(req, res)
  )
  .post("/follow", checkToken, (req, res) =>
    friendsController.addFriend(req, res)
  );

module.exports = router;

