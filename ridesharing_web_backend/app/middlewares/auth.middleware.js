  const response = require("../utils/responses");

exports.isLoggedIn = (req, res, next) => {
    try {
      let token = req.cookies.token;
      if (!token) {
        return response.badRequestResponse(res, "No Token.");
      }
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          return response.unauthorizedResponse(res, "User is not verified.");
        } else {
        }
        next();
      });
    } catch (error) {
      return response.serverErrorResponse(res, "Server Error.");
    }
  };

exports.isNotLoggedIn = (req, res, next) => {
    try {
      let token = req.cookies.token;
      if (token) {
        return response.badRequestResponse(res, "User Already Logged In.");
      }
      next();
      return;
    } catch (error) {
      return response.serverErrorResponse(res, "Server Error.");
    }
  };