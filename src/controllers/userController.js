const UserModel = require("../models/usersModel");
const bcrypt = require("bcrypt");
const setToken = require("../services/setToken");

const userController = {
  Register: async (req, res) => {
    try {
      const newUser = {
        name: req.body.name,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
      };
      newUser.userName = newUser.userName.toLowerCase()

      const verifyEmailExist = await UserModel.findOne({ email: newUser.email });
      if (verifyEmailExist) {
        return res.status(422).json({ msg: "Email já cadastrado" });
      }

      const verifyNameExist = await UserModel.findOne({ userName: newUser.userName });
      if (verifyNameExist) {
        return res.status(422).json({ msg: "Nome de usuário já cadastrado" });
      }

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(newUser.password, salt);
      newUser.password = passwordHash;

      const getnewUser = await UserModel.create(newUser);
      const getToken = setToken(getnewUser);
      res.status(201).json({
        msg: `Bem vindo ao ${getnewUser.name.toLowerCase()}`,
        dataUser: {
          id: getnewUser._id,
          userName: getnewUser.userName,
          name: getnewUser.name,
        },
        token: getToken,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Erro interno. STATUS DO ERRO: 500",
        error: error,
      });
    }
  },

  Login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const isUser = await UserModel.findOne({ email: email });

      if (!isUser) {
        return res.status(404).json({ msg: "Email ou senha incorretos" });
      }

      const checkPassword = await bcrypt.compare(password, isUser.password);
      if (!checkPassword) {
        return res.status(404).json({ msg: "Email ou senha incorretos" });
      }
      const getToken = setToken(isUser);
      res.status(200).json({
        msg: `Olá novamente ${isUser.name.toUpperCase()}!`,
        dataUser: {
          id: isUser._id,
          userName: isUser.userName,
          name: isUser.name,
        },
        token: getToken,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Erro interno. STATUS DO ERRO: 500",
        error: error,
      });
    }
  },

  FindSearch: async (req, res) => {
    try {
      const name = req.params.name
      console.log(name);
      const response = await UserModel.find({userName: new RegExp('^' +name, 'i')}).select('-password -email')
      console.log(response);
  
      if (!response || response.length == 0) {
        return res.status(405).json({ msg: "Usuário não encontrado..." });
      }
      res.status(200).json(response)
    }catch(error){
      res.status(500).json({
        msg: "Erro interno. STATUS DO ERRO: 500",
        error: error,
      });
    }
  },


  FindId: async (req, res) => {
    try {
      const name = req.params.name
      const response = await UserModel.findOne({userName: name}).select('-password -email')
      console.log(response);
  
      if (!response) {
        return res.status(404).json({ msg: "user não encontrado" });
      }
      res.status(200).json(response)
    }catch(error){
      res.status(500).json({
        msg: "Erro interno. STATUS DO ERRO: 500",
        error: error,
      });
    }
  },

  Update: async (req, res) => {
    try {
      const id = req.userId
      const updateUser = {
        name: req.body.name,
        description: req.body.description,
        address: req.body.address,
        links: req.body.links
      }
      const response = await UserModel.findByIdAndUpdate(id, updateUser)
  
      if (!response) {
        return res.status(404).json({ msg: "user não encontrado" });
      }
      res.status(200).json({msg:'atualizado com sucesso'})
    }catch(error){
      res.status(500).json({
        msg: "Erro interno. STATUS DO ERRO: 500",
        error: error,
      });
    }
  },
};

module.exports = userController;
