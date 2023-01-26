const express = require("express");

const router = express.Router();

const bookRouter = require("./book");
const productRouter = require("./product");

router.get("/", (req, res) => {
  res.send("Home page");
});

router.use("/books", bookRouter);
router.use("/api/v1/products", productRouter);

router.all("/*", (req, res) => {
  res.send("Page not found");
});

module.exports = router;
