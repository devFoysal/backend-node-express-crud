const db = require("../models");
const path = require("path");

const Product = db.products;
// const Review = db.reviews;

const addNewProduct = async (req, res) => {
  try {
    let newImageName, fileName, uploadPath, originalExtension;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res?.status(400)?.json({ message: "No files were uploaded." });
    }

    fileName = req.files?.image;
    originalExtension = req.files?.image?.mimetype?.split("/")[1];
    newImageName = `${Date.now()}.${originalExtension}`;
    uploadPath = `${path.resolve("./public/uploads/products")}/${newImageName}`;
    fileName.mv(uploadPath);

    const data = {
      title: req?.body?.title,
      image: newImageName,
      price: parseFloat(req?.body?.price),
      description: req?.body?.description,
    };

    const product = await Product.create(data);

    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    res.status(400).json({ message: "Bad request", error });
    console.log(`Error: ${error}`);
  }
};

const getAllProducts = async (req, res) => {
  const limit = 20;
  const offset = (req.query.page - 1) * limit;
  try {
    const products = await Product.findAndCountAll({
      offset: offset,
      limit: limit,
      // order: [["date", "ASC"]],
    });
    res.status(200).json(products);
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
    const data = {
      title: req?.body?.title,
      price: req?.body?.price,
      description: req?.body?.description,
    };
    const _id = req?.params?.id;
    await Product.update(data, { where: { id: _id } });
    res.status(201).json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(400).json({ message: "Bad request", error });
    console.log(`Error: ${error}`);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const _id = req?.params?.id;

    await Product.destroy({ where: { id: _id } });
    res.status(200).json({ message: `Delete successfully` });
  } catch (error) {
    res.status(404).json({ message: `Product not found`, error: error });
    console.log(`Error: ${error}`);
  }
};

const deleteMultipleProduct = async (req, res) => {
  try {
    await Product.destroy({ where: { id: req?.body?.ids } });
    res
      .status(200)
      .json({ message: `${req?.body?.ids?.length} Delete successfully` });
  } catch (error) {
    res.status(404).json({ message: `Product not found`, error: error });
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
  deleteMultipleProduct,
};
