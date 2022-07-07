const Joi = require("joi");

class Author {
  constructor({ id, firstName, lastName, email, password, books }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.books = [];
  }
}
function validateAuthor(author) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).required().max(50),
    lastName: Joi.string().required().max(50),
    email: Joi.string().email().required().min(5).max(255),
    password: Joi.string().required().min(5).max(255),
  });
  const { error } = schema.validate(author);
  return error;
}
module.exports = { Author, validateAuthor };
