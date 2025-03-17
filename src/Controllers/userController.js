const registerUser= require("../Services/userService.js");

async function createUser(req, res, next) {

    try {
        const response = await registerUser(req.body);
        return res.status(201).json({  // Use 201 for successful creation
            message: "Successfully created a user",
            success: true,
            data: response,
            error: {}
        });
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.reason,
            error:error
        })
    }
}

module.exports = {
    createUser
};
