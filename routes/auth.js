const Joi = require("joi");
const express = require("express");
const router = express.Router();
const { User } = require("../models/user");

router.post("/", async (req, res) => {
  const error = validate(req.body);

  if (error) return res.status(400).send(error.message);
  let user = await User.findOne({
    email: req.body.email,
  });
  if (!user) return res.status(400).send("Invalid email or password");

  let match = await bcrypt.compare(req.body.password, user.password);

  if (!match) return res.status(400).send("Invalid email or password");
  let token = user.generateAuthToken();
  res.send({
    success: true,
    token: token,
  });
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5).max(255),
  });
  const { error } = schema.validate(req);
  return error;
}
module.exports = router;
