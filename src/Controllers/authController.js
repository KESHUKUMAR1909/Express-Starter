const loginUser = require("../Services/authService");

async function login(req, res) {
    try {
        const loginPayload = req.body;

        // Call auth service
        const response = await loginUser(loginPayload);
        res.cookie('authToken' , response ,{httpOnly:true , secure:false , maxAge:7*24*60*60*1000})
        return res.status(200).json({
            success: true,
            message: "Login Successfully",
            error: {}
        });

    } catch (error) {
        console.error("Login Error:", error);

        return res.status(error.statusCode || 500).json({
            success: false,
            data: {},
            message: error.message || "Internal Server Error",
            error: error
        });
    }
}

module.exports = { login };
