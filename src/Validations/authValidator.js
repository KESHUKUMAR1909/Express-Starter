const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../Config/serverConfig');
const UnAuthorisedError = require('../Utils/unauthorizedError');
async function isLoggedIn(req ,res , next){
    const token = req.cookies['authToken'];
    if(!Token){
        return res.status(401).json({
            success:false ,
            data:{},
            error:"Not Authenticated",
            message:"No Auth token Provided"
        });
    }
    try{
    const decoded = jwt.verify(token , JWT_SECRET);
    if(!decoded){
        // return res.status(401).json({
        //     success:false,
        //     data:{},
        //     error:"Not Authenticated",
        //     message:"Invalid Token Provided",
        // });
        throw new UnAuthorisedError();
    }


    // if Reached here, then user is authenticated allow them to access the api paramter req:any
    res.user={
        email:decoded.email,
        id:decoded.id,
        role:decoded.role
    }
    next();
}catch(error){
    return res.status(401).json({
        success:false,
        data:{}
    })
}
}

// This functions checks if the user is authenticated user or not?
function  isAdmin(req , res , next){
    const isLoggedIn = req.user;
    if(isLoggedIn.role==="ADMIN"){
        next();
    }else{
        return res.status().json({
            success:false,
            data:{},
            message:"You are not a valid user for this action",
            error:{
                statusCode:401,
                reason:"Iunauthorised User"
            }
        })
    }


}
module.exports ={
    isLoggedIn,
    isAdmin
}
// client--->middleware--->controller