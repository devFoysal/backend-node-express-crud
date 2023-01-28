const db = require("../models");
const multer = require("multer");
const path = require("path");
const upload = multer({ dest: path.dirname("public/uploads/users/") });

const User = db.users;
// const Review = db.reviews;

const addNewUser = async (req, res) => {
  const data = {
    image: upload.single(req?.body?.image),
    fullName: req?.body?.fullName,
    username: req?.body?.username,
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

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({});
    res.status(200).send(users);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const getUser = async (req, res) => {
  try {
    const _id = req?.params?.id;
    const user = await User.findOne({ where: { id: _id } });
    res.status(200).send(user);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const updateUser = async (req, res) => {
  try {
    const _id = req?.params?.id;
    await User.update(req?.body, { where: { id: _id } });
    res.status(200).send(`Update successfully`);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const deleteUser = async (req, res) => {
  try {
    const _id = req?.params?.id;
    await User.destroy({ where: { id: _id } });
    res.status(200).send(`Delete successfully`);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

module.exports = {
  addNewUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
