module.exports = app => {
  const { authenticateToken } = require('../middlewares/authenticate')

  const BlogController = require("../controllers/blogs.controller");

  var router = require("express").Router();

  router.post("/posts", authenticateToken, BlogController.CreateBlogs)

  router.get("/posts", authenticateToken, BlogController.GetBlogs);

  router.get('/posts/:id', authenticateToken, BlogController.GetSingleBlogs)

  router.put('/posts/:id', authenticateToken, BlogController.UpdateBlogs);

  router.delete('/posts/:id', authenticateToken, BlogController.DeleteBlogs);


  app.use("/api", router);
};
