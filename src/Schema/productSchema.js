const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:[true , "Product name is required"],
        minLength:[5 , "Product name must be greater than 5 characters"],
        trim:true,
    },
    description:{
        type:String,
        minLength:[5 , "Product Description must be atleastr 5 Characters"],
    },
    productImage:{
        type:String,
    },
    price:{
        type:Number,
        required:[true , "Product Price is required"]

    } , 
    category:{
        tyep:String,
        enum:['veg' , 'non-veg','drinks' ,'sides'],
        default:'veg'
    },
    inStock:{
        type:Boolean,
        required:[true, "in Stock Status is required"],
        default:true
    }
} , {
    timestamps:true
})


const Product = mongoose.model('Product' , productSchema)
module.exports = Product;