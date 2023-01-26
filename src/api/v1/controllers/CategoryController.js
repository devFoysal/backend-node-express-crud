const db = require("../models");

const Category = db.categories;
// const Review = db.reviews;

const addNewCategory = async (req, res) => {
  const data = {
    parentId: req?.body?.parentId ?? null,
    title: req?.body?.title,
    status: 'active',
  };

  try {
    const category = await Category.create(data);
    res.status(200).send(`Created successfully\n${JSON.stringify(category)}`);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({});
    res.status(200).send(categories);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};


const getCategory = async (req, res) => {
  try {
    const _id = req?.params?.id;
    const category = await Category.findOne({ where: { id: _id } });
    res.status(200).send(category);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const updateCategory = async (req, res) => {
  try {
    const _id = req?.params?.id;
    await Category.update(req?.body, { where: { id: _id } });
    res.status(200).send(`Update successfully`);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const _id = req?.params?.id;
    await Category.destroy({ where: { id: _id } });
    res.status(200).send(`Delete successfully`);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

module.exports = {
  addNewCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
