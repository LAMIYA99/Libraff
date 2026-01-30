const Book = require("../models/Book");


const getBooks = async (req, res) => {
  try {
    let query = {};

    if (req.query.keyword) {
      query.title = {
        $regex: req.query.keyword,
        $options: "i", 
      };
    }

    if (req.query.category) {
      query.category = req.query.category;
    }

    const books = await Book.find(query);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


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


const createBookReview = async (req, res) => {
  const { rating, comment, user: userName } = req.body; 
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

      
      let totalRating = 0;
      for (let i = 0; i < book.reviews.length; i++) {
        totalRating += book.reviews[i].rating;
      }
      book.rating = totalRating / book.reviews.length;

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
