const router = require("express").Router();
const notificationsController = require("../controllers/notificationsController");
const checkToken = require("../middlewares/authMiddlewar");

router
  .route("/")
  .get(checkToken, (req, res) =>
    notificationsController.getNotifications(req, res)
  )
  .patch(checkToken, (req, res) =>
    notificationsController.readNotifications(req, res)
  );

module.exports = router;
