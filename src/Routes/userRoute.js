// Resourse ----User
// /users

const express = require('express');
const {createUser} = require('../Controllers/userController.js');
// We have to initialise a router object to add routers in a new file
const userRouter = express.Router();


userRouter.post("/create",createUser); //this is a new HTTP METHOD 

module.exports= userRouter; //Exporting the Router 