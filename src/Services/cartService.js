const { getCartByUserId, clearCart } = require("../Repository/cartRepository");
const { getProductById } = require('../Repository/productRepository.js');
const AppError = require("../Utils/appError.js");
const BadRequestError = require("../Utils/badRequestError.js");
const NotFoundError = require('../Utils/notFoundError.js')

async function getCart(userId) {
    const cart = await getCartByUserId(userId);
    if (!cart) {
        throw new NotFoundError('cart')
    }
    return cart;

}
async function modifyCart(userId, productId, shouldAdd = true) {
    const quantityValue = (shouldAdd == true) ? 1 : -1;
    const cart = await getCart(userId);
    const product = await getProductById(productId);
    if (!product) {
        throw new NotFoundError('Product');
    }
    if (!product.inStock && product.quantity <= 0) {
        throw new BadRequestError(["Product Not Available in Stock"])
    }
    let foundProduct = false;
    // May be the product is already in the cart
    cart.items.forEach(item => {
        if (item.product._id == productId) {
            if (shouldAdd) {
                if (product.quantity >= item.quantity + 1)
                    item.quantity += 1;
                else
                    throw new AppError("The quantity of the item is not available", 404)
            } else {
                if (item.quantity > 0){
                    item.quantity += quantityValue;
                    if(item.quantity==0){
                        cart.items=cart.items.filter(item=>item.product.id!=productId);
                        foundProduct=false;
                         return ;
                    }

                }else
                    throw new AppError("The quantity of the item is not available", 404)
            }
            foundProduct = true;
        }
    });
    if (!foundProduct) {
        if (shouldAdd) {
            cart.items.push({
                product: productId,
                quantity: 1
            })
        } else {
            throw new NotFoundError("Product in the cart")
        }
    }
    await cart.save();
    return cart;
}

async function clearProductsFromCart(userId){
    const response = await clearCart(userId);
    return response;
}
module.exports = {
    getCart,
    modifyCart,
    clearProductsFromCart
}