const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err) {
      res.status(400).send({ msg: "bad request/parameter missing" });
    } else {
      req.userId = decoded.userId;
      next();
    }
  });
};

module.exports = { authentication };
