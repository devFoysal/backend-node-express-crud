const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/UserController");

userRouter
  .route("/")
  .get(userController?.getAllCategories)
  .post(userController?.addNewCategory);

userRouter
  .route("/:id")
  .get(userController?.getCategory)
  .put(userController?.updateCategory)
  .patch((req, res) => {
    res.send("Partial update a user");
  })
  .delete(userController?.deleteCategory);

module.exports = userRouter;
