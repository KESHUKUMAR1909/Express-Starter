const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is Required"],
        minLength: [5, "First Name Must be Atleast 5 characters long"],
        lowercase: true,
        trim: true,//if the user gives extra spaces it will remove it 
        maxlength: [20, "First Name should be less than or equal to 20 characters"]

    },
    mobileNumber: {
        type: String,
        trim: true,
        unique: [true, "phome number is already in use"],
        required: [true, "Phone Number should be provided"],
        maxlength:[10 , "Phone Number should ne of 10 numbers"],
        minlength:[10 , "Phone Number should ne of 10 numbers"],

    },
    email: {
        type: String,
        trim: true,
        required: [true, "Email should ne provided"],
        unique: [true, "Email is already in use"],
        match: [/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/, "Please enter a valid Email"]

    },
    password:{
        type:String,
        required:[true , "password should be provided"],
        minLength:[6 , "password must be atleast 6 characters long"]
    }
} , {
    timestamps:true
});

userSchema.pre('save',async function(){
    // Here You can modify your user before it is saved in mongodb
    const hashPassword =await bcrypt.hash(this.password ,10);
    this.password = hashPassword;
})

const User = mongoose.model("User" , userSchema)
module.exports = User;