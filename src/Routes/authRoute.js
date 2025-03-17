// Resourse ----User
// /users

const express = require('express');
const {login} = require('../Controllers/authController.js');
// We have to initialise a router object to add routers in a new file
const authRouter = express.Router();

authRouter.post("/login",login); //this is a new HTTP METHOD 

module.exports= authRouter; //Exporting the Router 