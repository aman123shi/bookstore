const router = require("express").Router();
const { Book, validateBook } = require("../models/book");
const { Author, validateAuthor } = require("../models/author");
const jwt = require("jsonwebtoken");
const config = require("config");
let authors = [
  new Author({
    id: 1,
    firstName: "Amanuel",
    lastName: "Shiferaw",
    email: "aaa@gmail.com",
    password: "pas123",
  }),
  new Author({
    id: 2,
    firstName: "yismaek",
    lastName: "worku",
    email: "yismak@gmail.com",
    password: "yyyy123",
  }),
];

//api/authors
router.post("/", guard, async (req, res) => {
  let error = validateAuthor(req.body);
  if (error) return res.status(404).send(error.message);
  let newAuthor = new Author(req.body);
  newAuthor.id = books.length + 1;
  authors.push(newAuthor);

  let token = jwt.sign(
    {
      id: newAuthor.id,
    },
    config.get("jwtPrivateKey")
  );
  res.send({
    success: true,
    token: token,
  });
});
