const Book = require("../models/Book");

// @desc    Fetch all books
// @route   GET /api/books
// @access  Public
const getBooks = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          title: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const category = req.query.category ? { category: req.query.category } : {};

    const books = await Book.find({ ...keyword, ...category });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single book
// @route   GET /api/books/:id
// @access  Public
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a book
// @route   POST /api/books
// @access  Private/Admin (Public for now)
const createBook = async (req, res) => {
  try {
    const {
      code,
      title,
      price,
      discountPrice,
      image,
      description,
      category,
      features,
    } = req.body;

    const book = new Book({
      code,
      title,
      price,
      discountPrice,
      image,
      description,
      category,
      features,
    });

    const createdBook = await book.save();
    res.status(201).json(createdBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Create new review
// @route   POST /api/books/:id/reviews
// @access  Public
const createBookReview = async (req, res) => {
  const { rating, comment, user: userName } = req.body; // Assuming strictly passed fields for now

  try {
    const book = await Book.findById(req.params.id);

    if (book) {
      const review = {
        user: userName || "Anonymous",
        rating: Number(rating),
        comment,
      };

      book.reviews.push(review);

      book.numReviews = book.reviews.length;
      book.rating =
        book.reviews.reduce((acc, item) => item.rating + acc, 0) /
        book.reviews.length;

      await book.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  createBookReview,
};
