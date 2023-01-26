const db = require("../models");

const Product = db.products;
// const Review = db.reviews;

const addNewProduct = async (req, res) => {
  const data = {
    title: req?.body?.title,
    price: req?.body?.price,
    description: req?.body?.description,
    published: req?.body?.published ? req?.body?.published : false,
  };

  try {
    const product = await Product.create(data);
    res.status(200).send(`Created successfully\n${JSON.stringify(product)}`);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({});
    res.status(200).send(products);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const getPublishedProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ where: { published: true } });
    res.status(200).send(products);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const getProduct = async (req, res) => {
  try {
    const _id = req?.params?.id;
    const product = await Product.findOne({ where: { id: _id } });
    res.status(200).send(product);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const updateProduct = async (req, res) => {
  try {
    const _id = req?.params?.id;
    await Product.update(req?.body, { where: { id: _id } });
    res.status(200).send(`Update successfully`);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const _id = req?.params?.id;
    await Product.destroy({ where: { id: _id } });
    res.status(200).send(`Delete successfully`);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

module.exports = {
  addNewProduct,
  getAllProducts,
  getPublishedProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
