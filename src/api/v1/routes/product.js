const express = require("express");
const multer = require("multer");
const { storage } = require("../../../utils");
const productRouter = express.Router();
const productController = require("../controllers/ProductController");
const auth = require("../middleware/auth");

const upload = multer({
  storage: storage("products"),
  limits: { fileSize: 10 },
});

productRouter.route("/").get(productController?.getAllProducts);
productRouter.route("/:id").get(productController?.getProduct);

productRouter
  .route("/", [auth, upload.single("image")])
  .post(productController?.addNewProduct);
productRouter
  .route("/:id", auth)
  .put(productController?.updateProduct)
  .patch((req, res) => {
    res.send("Partial update a product");
  })
  .delete(productController?.deleteProduct);

productRouter
  .route("/multiple/delete", auth)
  .delete(productController?.deleteMultipleProduct);

module.exports = productRouter;
