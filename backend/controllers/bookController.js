const { getBooks, setBooks } = require("../data/mockData");

const getAllBooks = (req, res) => {
  res.json(getBooks());
};

const createBook = (req, res) => {
  const books = getBooks();
  const newBook = { id: `B${Date.now()}`, ...req.body };
  books.push(newBook);
  setBooks(books);
  res.status(201).json(newBook);
};

const updateBook = (req, res) => {
  const { id } = req.params;
  let books = getBooks();
  books = books.map((b) => (b.id === id ? { ...b, ...req.body } : b));
  setBooks(books);
  res.json(books.find((b) => b.id === id));
};

const deleteBook = (req, res) => {
  const { id } = req.params;
  let books = getBooks();
  books = books.filter((b) => b.id !== id);
  setBooks(books);
  res.status(204).send();
};

module.exports = { getAllBooks, createBook, updateBook, deleteBook };
