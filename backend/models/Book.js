const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: String, // Can be ObjectId if Users are implemented
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const bookSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0.0,
    },
    discountPrice: {
      type: Number,
      default: 0.0,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      // For "her sectiona uygun" (e.g., "Fiction", "Science", "Bestsellers")
      type: String,
      required: true,
    },
    features: {
      binding: { type: String, required: true }, // Cild (Hardcover, Softcover)
      language: { type: String, required: true }, // Dil
      author: { type: String, required: true }, // Müəllif
      publisher: { type: String, required: true }, // Nəşriyyat
      pageCount: { type: Number, required: true }, // Səhifə sayı
      age: { type: String, required: true }, // Yaş (e.g., "12+")
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
