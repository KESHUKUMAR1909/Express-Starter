const jwt = require("jsonwebtoken");
const { findUser } = require("../Repository/userRepository.js");
const { JWT_SECRET, JWT_EXPIRY } = require("../Config/serverConfig.js");
const bcrypt = require("bcrypt");

async function loginUser(authDetails) {
    const { email, password: plainPassword } = authDetails;

    const user = await findUser({ email });
    if (!user) {
        throw { message: "No User found with the given email", statusCode: 404 };
    }

    const isPasswordValidated = await bcrypt.compare(plainPassword, user.password);
    if (!isPasswordValidated) {
        throw { message: "Invalid Email or Password, please try again", statusCode: 401 };
    }
    const userRole = user.role?user.role:"USER";
    const token = jwt.sign(
        { email: user.email, id: user._id , role:userRole },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRY }
    );
    
    return token;
}

module.exports = loginUser;
