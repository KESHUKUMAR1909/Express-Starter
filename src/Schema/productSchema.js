const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: [true, "Product name is required"],
            minLength: [5, "Product name must be greater than 5 characters"],
            trim: true,
        },
        description: {
            type: String,
            minLength: [5, "Product Description must be at least 5 characters"],
        },
        productImage: {
            type: String,
        },
        price: {
            type: Number,
            required: [true, "Product Price is required"],
        },
        category: {
            type: String,  // Fixed typo here
            enum: ['veg', 'non-veg', 'drinks', 'sides'],
            default: 'veg',
        },
        inStock: {
            type: Boolean,
            required: [true, "In Stock Status is required"],
            default: true,
        },
        role:{
            type:String,
            enum:['USER' , 'ADMIN'],
            default:'USER'
        }
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
