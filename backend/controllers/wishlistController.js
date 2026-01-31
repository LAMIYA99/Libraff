const User = require("../models/User");

const getWishlist = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(req.user._id).populate("wishlist");
    if (user) {
      res.json(user.wishlist || []);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("wishlist fetch error:", error);
    res.status(500).json({ message: error.message });
  }
};

const toggleWishlist = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(req.user._id);
    const bookId = req.params.id;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.wishlist) {
      user.wishlist = [];
    }

    const isWishlisted = user.wishlist.some(
      (itemId) => itemId && itemId.toString() === bookId.toString(),
    );

    if (isWishlisted) {
      user.wishlist = user.wishlist.filter(
        (itemId) => itemId && itemId.toString() !== bookId.toString(),
      );
      await user.save();
      res.json({ message: "Removed from favorites", isWishlisted: false });
    } else {
      user.wishlist.push(bookId);
      await user.save();
      res.json({ message: "Added to favorites", isWishlisted: true });
    }
  } catch (error) {
    console.error("wishlist toggle error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getWishlist, toggleWishlist };
