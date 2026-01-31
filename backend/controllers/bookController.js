const Book = require("../models/Book");

const getAllBooks = async (req, res) => {
  try {
    const {
      search,
      category,
      language,
      minPrice,
      maxPrice,
      inStock,
      sort,
      limit,
    } = req.query;
    let query = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    if (language) {
      const langs = language.split(",");
      query["features.language"] = {
        $in: langs.map((l) => new RegExp(l, "i")),
      };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sortOptions = { createdAt: -1 };
    if (sort === "price-low") sortOptions = { price: 1 };
    if (sort === "price-high") sortOptions = { price: -1 };
    if (sort === "rating") sortOptions = { rating: -1 };

    const pageSize = Number(limit) || 16;
    const books = await Book.find(query).sort(sortOptions).limit(pageSize);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    const createdBook = await book.save();
    res.status(201).json(createdBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      Object.assign(book, req.body);
      const updatedBook = await book.save();
      res.json(updatedBook);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      await book.deleteOne();
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Book not found" });
    }
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

const createBookReview = async (req, res) => {
  const { rating, comment } = req.body;

  try {
    const book = await Book.findById(req.params.id);

    if (book) {
      const alreadyReviewed = book.reviews.find(
        (r) => r.user.toString() === req.user._id.toString(),
      );

      if (alreadyReviewed) {
        return res.status(400).json({ message: "Review already exists" });
      }

      const review = {
        name: `${req.user.firstName} ${req.user.lastName}`,
        rating: Number(rating),
        comment,
        user: req.user._id,
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
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  createBookReview,
};
