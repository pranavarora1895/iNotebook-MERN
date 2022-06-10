const jwt = require("jsonwebtoken");
const JWT_SECRET = "beerwhiskeyrumvodka";
const fetchuser = (req, res, next) => {
  // Get the user from the jwt token and add its id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({ error: "Invalid authentication token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid authentication token" });
  }
};

module.exports = fetchuser;
