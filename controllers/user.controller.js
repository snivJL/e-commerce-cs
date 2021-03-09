const utilsHelper = require("../helpers/utils.helper");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
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

module.exports = userController;
