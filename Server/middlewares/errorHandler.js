function errorHandler(err, req, res, next) {
    console.log("ERROR", err)
    let status = 500;
    let message = "Internal Server Error"

    if (err.name == "SequelizeValidationError" || err.name == "SequelizeUniqueConstraintError") {
        status = 400
        message = err.errors[0].message
    } else if (err.name == "empty_email") {
        status = 400
        message = "Email is required"
    } else if (err.name == "empty_password") {
        status = 400
        message = "Password is required"
    } else if (err.name == "fail_login") {
        status = 401
        message = "Invalid Email or Password"
    } else if (err.name == 'Unauthenticated' || err.name == 'JsonWebTokenError') {
        status = 401
        message = "Invalid Token"
    } else if (err.name == "crypto_not_found") {
        status = 404
        message = "Crypto Not Found"
    } else if (err.name == "wl_not_found") {
        status = 404
        message = "WL not found"
    }

    res.status(status).json({ message })
}

module.exports = errorHandler