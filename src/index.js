const express = require("express");
const connectDB = require('./Config/dbConfig.js');
const ServerConfig = require("./Config/serverConfig.js");
const userRouter = require("./Routes/userRoute.js");
const cartRouter = require("./Routes/cartRouter.js");
const authRouter = require("./Routes/authRoute.js");
const cloudinary = require('./Config/cloudinaryConfig.js');
const cookieParser = require("cookie-parser");
const uploader = require("./middlewares/multerMiddleware.js");

const productRouter = require("./Routes/productRoute.js");

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

// Route handlers
app.use('/users', userRouter);
app.use("/carts", cartRouter);
app.use('/auth', authRouter);
app.use('/products',productRouter);



// Start server
app.listen(ServerConfig.PORT, async () => {
    await connectDB();
    console.log("Server started at port " + ServerConfig.PORT);
});
