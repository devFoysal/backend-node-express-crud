const express = require("express");
const cors = require("cors");
const routes = require("./api/v1/routes");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

const options = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

// app.set("view engine", "pug")

// Middleware
app.use(cors(options));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(routes);

app.listen(PORT, () => {
  console.log(`App is running http://locahost:${PORT}`);
});
