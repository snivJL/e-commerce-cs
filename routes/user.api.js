const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

/**
 * @route POST api/users
 * @description Register new user
 * @access Public
 */
router.post("/", userController.register);

/**
 * @route GET api/users/me
 * @description Return current user info
 * @access Login required
 */

/**
 * @route GET api/users/:id/order
 * @description Return list orders of current user
 * @access Login Required or Admin authorized
 */

/**
 * @route Put api/user/:id/payment
 * @description User can make payment
 * @access Login required
 */

/**
 * @route PUT api/user/:id/topup
 * @description Top-up user balance
 * @access Admin requied
 */

module.exports = router;
