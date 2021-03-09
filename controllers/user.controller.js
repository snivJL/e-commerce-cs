const utilsHelper = require("../helpers/utils.helper");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Order = require("../models/Order");
const { Error } = require("mongoose");
const userController = {};

userController.register = async (req, res, next) => {
  try {
    let { name, email, password, role } = req.body;

    let user = await User.findOne({ email });
    if (user) return next(new Error("401 - User already exists"));

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    user = await User.create({ name, password, email, role });

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { user },
      null,
      "User account created"
    );
  } catch (error) {
    next(error);
  }
};

userController.getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) return next(new Error("401 - User not found"));

    utilsHelper.sendResponse(res, 200, true, { user }, null, "Current user");
  } catch (error) {
    next(error);
  }
};

userController.getUserOrders = async (req, res, next) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ userId })
      .populate("userId")
      .populate("products");

    utilsHelper.sendResponse(res, 200, true, { orders }, null, "Current user");
  } catch (error) {
    next(error);
  }
};

userController.topup = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const topup = req.body.topup;
    const user = await User.findByIdAndUpdate(
      { _id: userId },
      {
        $inc: { balance: topup },
      }
    );

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { user },
      null,
      "Balance updated!"
    );
  } catch (error) {
    next(error);
  }
};
module.exports = userController;
