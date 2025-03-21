const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    items:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required:true
            },
            quantity:{
                type:Number,
                required:true,
                default:1
            }
        }
    ]
    ,
    totalPrice:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        enum:['ORDERED' , 'CANCELLED' , 'SHIPPED' , 'OUT_FOR_DELIVERY' , 'DELIVERED',  "PREPARING"]
        ,
        default:'ORDERED'
    },
    address:{
        type:String,
        minLength:[10 , "Address should be fo atleast 10 chacraters"]
    },
    paymentMethod: {
            type: String,
            enum: ["Cash", "Online"],
            required: true
        },
} , {
    timestamps:true
});
const Order = mongoose.model('Order' , orderSchema);
module.exports=Order;