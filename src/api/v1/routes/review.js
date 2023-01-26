const express = require("express");

const reviewRouter = express.Router();

reviewRouter
  .route("/")
  .get((req, res) => {
    res.send("Get all reviews");
  })
  .post((req, res) => {
    res.send("Create a new review");
  });

reviewRouter
  .route("/:id")
  .get((req, res) => {
    res.send("Get a single review");
  })
  .put((req, res) => {
    res.send("Full update a review");
  })
  .patch((req, res) => {
    res.send("Partial update a review");
  })
  .delete((req, res) => {
    res.send("Delete a review");
  });

module.exports = reviewRouter;
