const asyncHandler = require("express-async-handler");

exports.protect = asyncHandler(async (req, res, next) => {
  if (req.headers.authorization) {
    if (req.headers.authorization === process.env.API_KEY) {
      next();
    } else {
      res.status(401);
      throw new Error("Not authorized, api-key failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no api-key");
  }
});
