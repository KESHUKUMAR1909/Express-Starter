const Product = require('../Schema/productSchema.js');
const BadRequestError = require('../Utils/badRequestError.js');
const InternalServerError = require('../Utils/internalServer.js')
async function createProduct(productDetails){
    try{
        const response = await Product.create(productDetails)
        return response;
    }catch(error){
        console.log(error)
    if (error.name==='ValidationError'){

            const errorMessageList = Object.keys(error.errors).map((property)=>{
                return error.errors[property].message;
            })
            throw new BadRequestError(errorMessageList);

        }
    }
}
async function getProductById(productId){
    try{
        const product = await Product.findById(productId);
        return product;

    }catch(error){
        console.log(error);
        throw new InternalServerError();
    }
}
async function deleteProductById(productId){
    try{
        const response = await Product.findByIdAndDelete(productId);
        return response;
    }catch(error){
        console.log(error);
    }
}
module.exports={
    createProduct,
    getProductById,
    deleteProductById,
}
