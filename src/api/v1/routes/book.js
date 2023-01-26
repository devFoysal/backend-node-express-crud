const express = require("express");

const bookRouter = express.Router();

bookRouter
  .route("/")
  .get((req, res) => {
    res.send("Get all books");
  })
  .post((req, res) => {
    res.send("Create a new book");
  });

bookRouter
  .route("/:id")
  .get((req, res) => {
    res.send("Get a single book");
  })
  .put((req, res) => {
    res.send("Full update a book");
  })
  .patch((req, res) => {
    res.send("Partial update a book");
  })
  .delete((req, res) => {
    res.send("Delete a book");
  });

module.exports = bookRouter;
