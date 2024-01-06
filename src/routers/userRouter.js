const router = require("express").Router();
const userController = require("../controllers/userController");
const checkToken = require("../middlewares/authMiddlewar");


router
    .post("/register", (req, res) => userController.Register(req, res));
router
    .post("/login", (req, res) => userController.Login(req, res));
router
    .get("/:name", checkToken, (req, res) => userController.FindId(req, res))
    .get("/search/:name", checkToken, (req, res) => userController.FindSearch(req, res))
router
    .patch("/edit/user", checkToken, (req, res) => userController.Update(req, res));


module.exports = router;
