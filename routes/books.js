const router = require("express").Router();
const { Book, validateBook } = require("../models/book");
const { Author } = require("../models/author");
const guard = require("../middlewares/guard");
//simulating DB
let books = [
  new Book({
    id: 1,
    title: "Think ang grow rich",
    author: 1,
    description: "self development book ",
    coverImage: "some_path.jpg",
    price: 100,
  }),
  new Book({
    id: 2,
    title: "dertogada",
    author: 2,
    description: "si-fi book  ",
    coverImage: "some_path.jpg",
    price: 150,
  }),
];
//get all books query params price and author
router.get("/", async (req, res) => {
  //query by author and price
  let selectedBooks = [];
  if (req.query.price || req.query.author) {
    if (req.query.price) {
      for (const book of books) {
        if (book.price == parseInt(req.query.price)) selectedBooks.push(book);
      }
    }
    if (req.query.author) {
      for (const book of books) {
        if (book.author == req.query.author) selectedBooks.push(book);
      }
    }
    return res.send(selectedBooks);
  }

  res.send(selectedBooks);
});
//get movies by ID
router.get("/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let book = books.find((book) => book.id == id);
  if (!book) return res.status(404).send("book not found ");
  res.send(book);
});
//POST api/books/
router.post("/", guard, async (req, res) => {
  let error = validateBook(req.body);
  if (error) return res.status(404).send(error.message);
  let newBook = new Book(req.body);
  newBook.id = books.length + 1;
  books.push(newBook);
  res.status(200).send(newBook);
});
//PUT api/books/:id
router.put("/:id", guard, async (req, res) => {
  let id = parseInt(req.params.id);
  let bookIndex = books.findIndex((book) => book.id == id);
  if (bookIndex == -1) return res.status(404).send("book not found ");
  //validate book data
  let error = validateBook(req.body);
  if (error) return res.send(error.message);
  let newBook = new Book(req.body);
  books.slice(bookIndex, 1, newBook);

  res.status(200).send(newBook);
});

//DELETE api/books/:id
router.delete("/:id", guard, async (req, res) => {
  let id = parseInt(req.params.id);
  let bookIndex = books.findIndex((book) => book.id == id);
  let book = books[bookIndex];
  if (bookIndex == -1) return res.status(404).send("book not found ");
  books.slice(bookIndex, 1);
  res.status(200).send(book);
});

router.delete();
