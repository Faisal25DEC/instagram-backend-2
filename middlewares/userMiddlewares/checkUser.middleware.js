const UserModel = require("../../model/user.model");

const checkUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    res.status(200).send({ msg: "user already exist" });
  } else {
    next();
  }
};

module.exports = checkUser;
