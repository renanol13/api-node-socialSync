const CommentsModel = require("../models/commentsModel");

const commentsController = {
  CreateComments: async (req, res) => {
    try {
      const newPost = {
        author: req.userId,
        userNameAuthor: req.userName,
        nameAuthor: req.name,
        idPost: req.params.id,
        content: req.body.content,
      };
      await CommentsModel.create(newPost);
      res.status(201).json({ msg: "Comentario criado" });
    } catch (error) {
      res.status(500).json({
        msg: "Erro interno. STATUS DO ERRO: 500",
        error: error,
      });
    }
  },
  FindIdPost: async (req, res) => {
    const id = req.params.id;
    try {
      const response = await CommentsModel.find({ idPost: id }).sort({createdAt: -1});
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        msg: "Erro interno. STATUS DO ERRO: 500",
        error: error,
      });
    }
  },

  Delete: async (req, res) => {
    try {
      const idPost = req.params.id
      const response = await CommentsModel.deleteMany({idPost: idPost})
      if (!response) {
        return res.status(404).json({ msg: "comentario não encontrado" });
      }
      res.status(200).json({ msg: "Comentario deletado" });
    } catch (error) {
      res.status(500).json({
        msg: "Erro interno. STATUS DO ERRO: 500",
        error: error,
      });
    }
  },
};

module.exports = commentsController;
