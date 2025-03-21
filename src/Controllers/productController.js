const { createProduct, getProductById, deleteProductById } = require('../Services/productService.js');
const AppError = require('../Utils/appError.js');
async function addProduct(req, res) {
    // try {
    //     console.log(req.file); // Log uploaded file details

    //     if (!req.file) {
    //         return res.status(400).json({ message: "No file uploaded" });
    //     }

    //     const result = await cloudinary.uploader.upload(req.file.path);
    //     console.log(result);

    //     await fs.unlink(req.file.path); // ✅ Correct way to delete the uploaded file after upload

    //     return res.json({
    //         message: "OK",
    //         url: result.secure_url // Using secure URL for HTTPS
    //     });
    // } catch (error) {
    //     console.error(error);
    //     return res.status(500).json({ message: "Upload failed", error });
    // }
    try {
        const product = await createProduct({
            productName: req.body.productName,
            description: req.body.description,
            imagePath: req.file?.path,
            price: req.body.price,
            category: req.body.category, //If category is undefined , ved will be stored
            inStock: req.body.inStock //if inStock is undefined then true will be stored

        });
        return res.status(201).json({
            success:true,
            message:"Successfully create the product",
            error:{},
            data:product
        })
    } catch (error) {
        if(error instanceof AppError){

        
         return res.status(error.statusCode).json({
            success:false,
            message:error.message,
            data:{},
            error:error
         })
        }
        console.log(error);
        return res.statusCode(500).json({
            success:false, 
            message:"Something went wrong",
            data:{},
            error:error
        })
    }

}

async function deleteProduct(req , res){
    try{
        const response = await deleteProductById(req.params.id);
        return res.status(200).json(
            {
                success:true,
                message:"Successfully  deleted the  Product",
                error:{},
                data:response
            }
        )

    }catch(error){
        if(error instanceof AppError){

        
            return res.status(error.statusCode).json({
               success:false,
               message:error.message,
               data:{},
               error:error
            })
           }
           console.log(error);
           return res.statusCode(500).json({
               success:false, 
               message:"Something went wrong",
               data:{},
               error:error
           })
    }
}
async function getProduct(req , res){
    try{
        const response = await getProductById(req.params.id);
        return res.status(200).json(
            {
                success:true,
                message:"Successfully fetched the details of the Product",
                error:{},
                data:response
            }
        )

    }catch(error){
        if(error instanceof AppError){

        
            return res.status(error.statusCode).json({
               success:false,
               message:error.message,
               data:{},
               error:error
            })
           }
           console.log(error);
           return res.statusCode(500).json({
               success:false, 
               message:"Something went wrong",
               data:{},
               error:error
           })
    }
}
module.exports={
    addProduct,
    getProduct,
    deleteProduct
}