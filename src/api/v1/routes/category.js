const express = require("express");
const categoryRouter = express.Router();
const categoryController = require("../controllers/categoryController");

categoryRouter
  .route("/")
  .get(categoryController?.getAllCategories)
  .post(categoryController?.addNewCategory);

categoryRouter
  .route("/:id")
  .get(categoryController?.getCategory)
  .put(categoryController?.updateCategory)
  .patch((req, res) => {
    res.send("Partial update a category");
  })
  .delete(categoryController?.deleteCategory);

module.exports = categoryRouter;
