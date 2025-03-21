const Cart = require('../Schema/cartSchema.js');
const InternalServerError = require('../Utils/internalServer');
async function createCart(userId){
    try{
    const newCart= await Cart.create({
        user:userId
    });
}catch(error){
    if (error.name==='ValidationError'){

        const errorMessageList = Object.keys(error.errors).map((property)=>{
            return error.errors[property].message;
        })
        throw new BadRequestError(errorMessageList);

    }
    console.log(error);
    throw new InternalServerError();
}

}

async function getCart(userId){
    try{
        const cart = await cart.findOne({
            user:userId
    });
        return cart;
    }catch(error){
        console.log(error);
        throw new InternalServerError();
    }
}

module.exports={
    createCart
    ,getCart
} 