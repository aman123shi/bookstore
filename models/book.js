const Joi = require("joi");

class Book {
  constructor({ id, title, author, description, coverImage, price }) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.description = description;
    this.coverImage = coverImage;
    this.price = price;
  }
}
function validateBook(book) {
  const schema = Joi.object({
    title: Joi.string().min(2).required().max(50),
    author: Joi.number().required(),
    description: Joi.string().required().min(5).max(255),
    coverImage: Joi.string().required().min(5).max(255),
    price: Joi.number().required(),
  });
  const { error } = schema.validate(book);
  return error;
}
module.exports = { Book, validateBook };
