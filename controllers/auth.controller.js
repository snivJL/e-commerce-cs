const utilsHelper = require("../helpers/utils.helper");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { Error } = require("mongoose");

let authController = {};

authController.loginWithEmail = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    user = await User.findOne({ email });
    if (!user) return next(new Error("401 - Email not found"));

    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) return next(new Error("401 - Wrong password"));

    const token = await user.generateToken();
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { user, token },
      null,
      "User logged in"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = authController;
