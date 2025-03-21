const cloudinary = require("../Config/cloudinaryConfig.js");
const ProductRepository = require('../Repository/productRepository');
const fs = require('fs/promises');
const InternalServerError = require("../Utils/internalServer.js");
const NotFoundError = require("../Utils/notFoundError.js")
async function createProduct(productDetails){
    // 1.We Should check if an image is coming to create the product , then we should first upload it on cloudinary
    const imagePath = productDetails.imagePath;
    if(imagePath){
        try{
        var cloudinaryResponse = await cloudinary.uploader.upload(imagePath);
        //process.cwd() gives the main directry path
        await fs.unlink(process.cwd()+"/"+imagePath);
        }catch(error){
            console.log(error)
            throw new InternalServerError();
        }

        var productImage = cloudinaryResponse.secure_url;

    }

    // 2.then use the url from cloudinary and other produts details to add in product

    const product = await ProductRepository.createProduct({
        ...productDetails,
        productImage:productImage
    });
    return product;

}

async function getProductById(productId){
    const response = await ProductRepository.getProductById(productId);
    if(!response){
        throw new NotFoundError('Product')
    }
    return response;
}
async function deleteProductById(productId){
    const response = await ProductRepository.deleteProductById(productId);
    if(!response){
        throw new NotFoundError('Product')
    }
    return response;
}
module.exports={
    createProduct,
    getProductById,
    deleteProductById,
}