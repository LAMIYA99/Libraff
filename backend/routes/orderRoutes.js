const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  getMyOrders,
  updateOrderStatus,
  deleteOrder,
  createOrder,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getAllOrders);
router.get("/myorders", protect, getMyOrders);
router.post("/", createOrder);
router.patch("/:id", protect, updateOrderStatus);
router.delete("/:id", protect, deleteOrder);

module.exports = router;
