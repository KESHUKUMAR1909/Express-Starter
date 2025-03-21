const express = require('express');
const {addProduct, getProduct, deleteProduct} = require('../Controllers/productController.js');
const uploader = require('../middlewares/multerMiddleware.js');
const { isLoggedIn, isAdmin } = require('../Validations/authValidator.js');
const productRouter = express.Router();

productRouter.post("/",isLoggedIn , isAdmin ,uploader.single('productImage') ,addProduct);
productRouter.get('/:id',getProduct);
productRouter.delete('/:id',deleteProduct)

module.exports = productRouter;