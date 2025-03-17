const express = require('express');
const getCartById = require('../Controllers/cartController');
const cartRouter = express.Router();

cartRouter.get("/:id",getCartById);

module.exports = cartRouter;