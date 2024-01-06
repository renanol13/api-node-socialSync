const router = require("express").Router();
const postController = require("../controllers/postsController");
const checkToken = require("../middlewares/authMiddlewar");

router
  .route("/")
  .post(checkToken, (req, res) => postController.CreatePost(req, res))
  .get(checkToken, (req, res) => postController.FindAll(req, res));

router
  .route("/user")
  .post(checkToken, (req, res) => postController.FindUserName(req, res));
  
router
  .route("/:id")
  .get(checkToken, (req, res) => postController.FindId(req, res))
  .patch(checkToken, (req, res) => postController.Update(req, res))
  .delete(checkToken, (req, res) => postController.Delete(req, res));

router
  .route("/like/:id")
  .post(checkToken, (req, res) => postController.likePost(req, res))
module.exports = router;
