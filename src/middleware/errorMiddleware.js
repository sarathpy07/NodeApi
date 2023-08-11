const config = require("../config/config");
const errorMiddleware = (err, req, res, next) => {
    console.log('here is an error middleware');
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    res.json({message: err.message, stack: config.NODE_ENV === "development" ? err.stack : null});
}

module.exports = errorMiddleware