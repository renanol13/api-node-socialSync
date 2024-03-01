const NotificationsModel = require("../models/notificationsModel");

const notificationsController = {
  getNotifications: async (req, res) => {
    const id = req.userId;

    try {
      const notifications = await NotificationsModel.find({ author: id });

      res.status(200).json(notifications);
    } catch (error) {
      console.log("po");
      res.status(500).json({
        msg: "Erro interno. STATUS DO ERRO: 500",
        error: error,
      });
    }
  },
  readNotifications: async (req, res) => {
    const id = req.userId;
    try {
      await NotificationsModel.updateMany(
        { author: id },
        { $set: { isRead: true } }
      );

      const notifications = await NotificationsModel.find({ author:id})
      
      res.status(200).json(notifications);
    } catch (error) {
      console.log("po");
      res.status(500).json({
        msg: "Erro interno. STATUS DO ERRO: 500",
        error: error,
      });
    }
  },
};

module.exports = notificationsController;
