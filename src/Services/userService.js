const { findUser , createUser } = require("../Repository/userRepository");

async function registerUser(userDetails) {
    console.log("Hitting the service layeer")
    // It will create a brnd new user

    // 1.we need to chech if the user with this emial and mobile number alredy exists or not
    const user = await findUser({
        email: userDetails.email,
        mobileNumber: userDetails.mobileNumber
    })
    console.log(user)
    if (user) {
        throw { reason: 'User with the given email and mobile number already exists ', statusCode: 400 }
    }
    //2. If not then create the suer in the database
    const newUser = await createUser({
        email: userDetails.email,
        password: userDetails.password,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        mobileNumber: userDetails.mobileNumber
    });
    console.log(newUser)

    if (!newUser) {
        throw { reason: "Something went wrong , cannot create User", statusCode: 500 }
    }
    console.log(newUser)


    //3.return the details of the created user
    return newUser;
}

module.exports = registerUser;