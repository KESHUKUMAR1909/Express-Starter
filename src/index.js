const express = require("express");
const ServerConfig = require("./Config/serverConfig.js")
const app = express();
app.listen(ServerConfig.PORT, ()=>{
    console.log("server started at port"+ServerConfig.PORT);
})