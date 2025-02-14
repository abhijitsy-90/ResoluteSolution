require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "default";
const generateToken = (username,Id) => {
  const token = jwt.sign(
    {
      username,
      Id
    },
    secret,
    { expiresIn: "30d" }
  );
  return token;
};

const secret1 = process.env.JWT_SECRET || "default";

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Missing access token' });
  }
  jwt.verify(token, secret1, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ status: false, error: 'Invalid access token', tokenExpired: true });
    }
    req.user = decodedToken;
    next();
  });
};
module.exports = {
  generateToken, authenticateToken
};

