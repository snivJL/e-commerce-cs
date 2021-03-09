const mongoose = require("mongoose");
const Product = require("../models/Product");

const utilsHelper = require("../helpers/utils.helper");

const { validationResult, check } = require("express-validator");
const validator = require("../middlewares/validation");

let productController = {};

productController.getAllProducts = async (req, res, next) => {
  try {
    let { page, limit, sortBy, ...filter } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const totalProducts = await Product.countDocuments({
      ...filter,
      isDeleted: false,
    });
    console.log("totalproducts", totalProducts);

    const totalPages = Math.ceil(totalProducts / limit);
    console.log("totalpages", totalPages);

    const offset = limit * (page - 1);
    console.log("offset", offset);

    const products = await Product.find({}).skip(offset).limit(limit);

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { products },
      null,
      "List of products"
    );
  } catch (error) {
    next(error);
  }
};
productController.createProduct = async (req, res, next) => {
  try {
    const { name, description, price, images } = req.body;
    const product = await Product.create({ name, description, price, images });

    utilsHelper.sendResponse(res, 200, true, product, null, "Product created");
  } catch (error) {
    next(error);
  }
};

productController.updateProduct = async (req, res, next) => {
  const { name, description, price, images } = req.body;
  const productId = req.params.id;

  let fields = {};

  if (name) fields.name = name;
  if (description) fields.description = name;
  if (price) fields.price = price;
  if (images) fields.images = images;
  try {
    const product = await Product.findByIdAndUpdate(
      { _id: productId },
      { $set: fields },
      { new: true }
    );
    if (!product) {
      return next(new Error("Product not found"));
    }
    utilsHelper.sendResponse(res, 200, true, product, null, "Product updated");
  } catch (error) {
    next(error);
  }
};
module.exports = productController;
