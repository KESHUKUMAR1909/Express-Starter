const express = require('express');
const { getCartByUser, modifyProductToCart, clearCartById } = require('../Controllers/cartController'); // Fix import
const { isLoggedIn } = require('../Validations/authValidator'); // Fix import

const cartRouter = express.Router();

cartRouter.get("/:id", isLoggedIn, getCartByUser);
cartRouter.post("/:operation/:productId", isLoggedIn, modifyProductToCart); // Fix function reference
cartRouter.delete('/products',isLoggedIn , clearCartById)

module.exports = cartRouter;
