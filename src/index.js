const express = require("express");
const cors = require("cors");
const routes = require("./api/v1/routes");

const app = express();
const PORT = process.env.PORT || 8000;

const options = {
  origin: `http://localhost:${PORT}`,
};

// app.set("view engine", "pug")

// Middleware
app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);


app.listen(PORT, () => {
  console.log(`App is running http://locahost:${PORT}`);
});
