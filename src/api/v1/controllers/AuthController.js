const db = require("../models");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");

const upload = multer({ dest: path.dirname("public/uploads/users/") });

const User = db.users;
// const Review = db.reviews;

const signUp = async (req, res) => {
  const data = {
    // image: upload.single(req?.body?.image),
    fullName: req?.body?.fullName,
    email: req?.body?.email,
    contactNumber: req?.body?.contactNumber,
    password: req?.body?.password,
  };

  try {
    const user = await User.create(data);
    res.status(200).send(`Created successfully\n${JSON.stringify(user)}`);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const signIn = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req?.body?.email, password: req?.body?.password },
    });
    if (!user) return res.status(404).send(`Email not found`);
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    user.token = token;
    res.status(200).json({ token });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const signOut = async (req, res) => {
  try {
    const token =
      req.body?.token || req.query?.token || req.headers["x-access-token"];

    // jwt.destroy(token);

    res.status(200).json({ message: "Sign Out successfully" });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

module.exports = {
  signUp,
  signIn,
  signOut,
};
