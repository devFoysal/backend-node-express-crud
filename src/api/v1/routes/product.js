const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/ProductController");

productRouter
  .route("/")
  .get(productController?.getAllProducts)
  .post(productController?.addNewProduct);

productRouter
  .route("/:id")
  .get(productController?.getProduct)
  .put(productController?.updateProduct)
  .patch((req, res) => {
    res.send("Partial update a product");
  })
  .delete(productController?.deleteProduct);

module.exports = productRouter;
