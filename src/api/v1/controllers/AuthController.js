const db = require("../models");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const upload = multer({ dest: path.dirname("public/uploads/users/") });

const User = db.users;
// const Review = db.reviews;

const signUp = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req?.body?.password, salt);

  const data = {
    username: req?.body?.username,
    password: hashPassword,
  };

  try {
    const user = await User.create(data);

    const userData = {
      id: user?.id,
      username: user?.username,
    };
    const token = jwt.sign({ userData }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res
      .cookie("token", token, {
        secure: process.env.NODE_ENV === "development",
        httpOnly: true,
        expires: new Date(new Date().getTime() + 86409000),
      })
      .json({ message: "Sign up successfully", user: userData, token });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const signIn = async (req, res) => {
  const { username, password } = req?.body;
  try {
    const user = await User.findOne({
      where: { username },
    });

    if (!user) return res.status(404).json({ message: `User not found` });

    const isPasswordMatched = await bcrypt.compare(password, user?.password);

    if (!isPasswordMatched)
      return res.status(404).json({ message: "Wrong credentials pass" });

    const userData = {
      id: user?.id,
      username: user?.username,
    };
    const token = jwt.sign({ userData }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res
      .cookie("token", token, {
        secure: process.env.NODE_ENV === "development",
        httpOnly: true,
        expires: new Date(new Date().getTime() + 86409000),
      })
      .json({ message: "Sign in successfully", user: userData, token });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const signOut = async (req, res) => {
  try {
    res?.clearCookie("token");
    res?.clearCookie("isAuthenticated");
    res?.clearCookie("user");
    res.status(200).json({ status: true, message: "Sign Out successfully" });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

module.exports = {
  signUp,
  signIn,
  signOut,
};
