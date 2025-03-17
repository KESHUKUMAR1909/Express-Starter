const express = require("express");
const connectDB = require('./Config/dbConfig.js');
const ServerConfig = require("./Config/serverConfig.js");
const userRouter = require("./Routes/userRoute.js");
const cartRouter = require("./Routes/cartRouter.js");
const authRouter = require("./Routes/authRoute.js");
const cloudinary = require('./Config/cloudinaryConfig.js');
const cookieParser = require("cookie-parser");
const uploader = require("./middlewares/multerMiddleware.js");
const fs = require('fs/promises');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

// Route handlers
app.use('/users', userRouter);
app.use("/carts", cartRouter);
app.use('/auth', authRouter);

app.post('/photo', uploader.single('photo'), async (req, res) => {
    try {
        console.log(req.file); // Log uploaded file details

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const result = await cloudinary.uploader.upload(req.file.path);
        console.log(result);

        await fs.unlink(req.file.path); // ✅ Correct way to delete the uploaded file after upload

        return res.json({
            message: "OK",
            url: result.secure_url // Using secure URL for HTTPS
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Upload failed", error });
    }
});

// Start server
app.listen(ServerConfig.PORT, async () => {
    await connectDB();
    console.log("Server started at port " + ServerConfig.PORT);
});
