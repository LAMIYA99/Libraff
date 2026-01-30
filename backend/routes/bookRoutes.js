const express = require("express");
const router = express.Router();
const {
  getBooks,
  getBookById,
  createBook,
  createBookReview,
} = require("../controllers/bookController");

router.route("/").get(getBooks).post(createBook);
router.route("/:id").get(getBookById);
router.route("/:id/reviews").post(createBookReview);

module.exports = router;
