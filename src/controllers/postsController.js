const PostModel = require("../models/postsModel");

const postController = {
  CreatePost: async (req, res) => {
    try {
      const newPost = {
        author: req.userId,
        userNameAuthor: req.userName,
        nameAuthor: req.name,
        content: req.body.content,
      };


      await PostModel.create(newPost);
      res.status(201).json({ msg: "post criado" });
    } catch (error) {
      res.status(500).json({
        msg: "Erro interno. STATUS DO ERRO: 500",
        error: error,
      });
    }
  },

  FindId: async (req, res) => {
    try {
      const id = req.params.id
      const response = await PostModel.findById(id)
  
      if (!response) {
        return res.status(404).json({ msg: "post não encontrado" });
      }
      res.status(200).json([response])
    }catch(error){
      res.status(500).json({
        msg: "Erro interno. STATUS DO ERRO: 500",
        error: error,
      });
    }
  },

  FindAll: async (req, res) => {
    try {
      const response = await PostModel.find().sort({createdAt: -1});
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        msg: "Erro interno. STATUS DO ERRO: 500",
        error: error,
      });
    }
  },

  FindUserName: async (req, res) => {    
    const userName = req.body.userName
    try {
      const response = await PostModel.find({userNameAuthor: userName}).sort({createdAt: -1});
      if (!response) {
        return res.status(404).json({ msg: "usuario não encontrado" });
      }
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        msg: "Erro interno. STATUS DO ERRO: 500",
        error: error,
      });
    }
  },


  Update: async (req, res) => {
    try {
      const id = req.params.id;
      const content = req.body.content;
      const response = await PostModel.findByIdAndUpdate(id, {
        content: content,
      });

      if (!response) {
        return res.status(404).json({ msg: "post não encontrado" });
      }

      res.status(200).json({ msg: "post atualizado" });
    } catch (error) {
      res.status(500).json({
        msg: "Erro interno. STATUS DO ERRO: 500",
        error: error,
      });
    }
  },

  Delete: async (req, res) => {
    try {
      const id = req.params.id;
      const response = await PostModel.findByIdAndDelete(id);
      if (!response) {
        return res.status(404).json({ msg: "post não encontrado" });
      }
      res.status(200).json({ msg: "post deletado" });
    } catch (error) {
      res.status(500).json({
        msg: "Erro interno. STATUS DO ERRO: 500",
        error: error,
      });
    }
  },


  likePost: async (req, res) => {
    try {
      const id = req.params.id
      const newLike = {
        author: req.userId,
        nameAuthor: req.userName,
      }
      
      
      const post = await PostModel.findById(id)
      
      const existingLike = post.likes.find((elm) => newLike.author == elm.author)
      if (existingLike) {
        post.likes = post.likes.filter((elm) => elm.author != newLike.author)
        await post.save()
        return res.status(200).json({msg:'like apagado'})
        
      }

      post.likes.push(newLike)
      await post.save()
      res.status(201).json({msg: 'like criado'})
      
    } catch (error) {
      res.status(500).json({
        msg: "Erro interno. STATUS DO ERRO: 500",
        error: error,
      });
    }
  }
  
};

module.exports = postController;
