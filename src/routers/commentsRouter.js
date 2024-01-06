const router = require("express").Router();
const CommentsController = require("../controllers/commentsController");
const checkToken = require("../middlewares/authMiddlewar");

router
  .route("/:id")
  .post(checkToken, (req, res) => CommentsController.CreateComments(req, res))
  .get(checkToken, (req, res) => CommentsController.FindIdPost(req, res))
  .delete(checkToken, (req, res) => CommentsController.Delete(req, res));


module.exports = router;
