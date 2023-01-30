const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

const productRouter = require("./product");
const authRouter = require("./auth");

router.get("/", (req, res) => {
  res.send("Home page");
});

router.use("/api/v1/auth", authRouter);
router.use("/api/v1/products", productRouter);

router.all("/*", (req, res) => {
  res.send("Page not found");
});

module.exports = router;
