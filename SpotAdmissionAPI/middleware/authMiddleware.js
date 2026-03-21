const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const protect = asyncHandler(async (req, res, next) => {
  let token = null;

  // Get token from header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  // No token found → stop here
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      res.status(401);
      throw new Error("User not found");
    }

    next(); // Continue to route
  } catch (error) {
    console.error("JWT Error:", error.message);
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }

  res.status(403);
  throw new Error("Not authorized as admin");
};

module.exports = { protect, admin };
