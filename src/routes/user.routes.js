module.exports = app => {
    const { authenticateToken } = require('../middlewares/authenticate')
  
    const UserController = require("../controllers/user.controller");
   
    var router = require("express").Router();

    router.post("/register",UserController.Registration)
    

    router.post("/login",UserController.login)
  
    
    app.use("/api/auth", router);
  };
  
  
  
  