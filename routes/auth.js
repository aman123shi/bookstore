const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const { Author, validateAuthor } = require("../models/author");
let authors = []; //some authors

//POST api/auth/login
router.post("/login", async (req, res) => {
  const error = validate(req.body);

  if (error) return res.status(400).send(error.message);
  let author = null;
  for (const a of authors) {
    if (a.email == req.body.email) {
      author = a;
      break;
    }
  }
  if (!author) return res.status(400).send("Invalid email or password");

  let match = req.body.password == author.password;

  if (!match) return res.status(400).send("Invalid email or password");
  let token = jwt.sign(
    {
      id: author.id,
    },
    config.get("jwtPrivateKey")
  );
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
