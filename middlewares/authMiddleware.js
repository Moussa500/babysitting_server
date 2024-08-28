const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const protect = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.jwt_secret_key, async (error, decoded) => {
      if (error) {
        console.log(error);
        return res.status(401).json({ message: err.message });
      }
      try {
        req.user = await User.findById(decoded.id);
        next();
      } catch (error) {
        console.log(error);
        return res.status(401).json({ message: error.message });
      }
    });
  } else {
    if (!token) {
      return res.status(401).json({ message: "Not Authorized, no token" });
    }
  }
};

module.exports = { protect };
