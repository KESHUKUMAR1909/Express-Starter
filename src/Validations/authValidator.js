const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../Config/serverConfig');
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
    const decoded = jwt.verify(token , JWT_SECRET);
    if(!decoded){
        return res.status(401).json({
            success:false,
            data:{},
            error:"Not Authenticated",
            message:"Invalid Token Provided",
        });
    }


    // if Reached here, then user is authenticated allow them to access the api paramter req:any
    res.user={
        email:decoded.email,
        id:decoded.id
    }
    next();
}

module.exports ={
    isLoggedIn
}
// client--->middleware--->controller