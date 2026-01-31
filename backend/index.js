const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const bookRoutes = require("./routes/bookRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const authRoutes = require("./routes/authRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");

connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/wishlist", wishlistRoutes);

app.get("/", (req, res) => {
  res.send("Libraff API active");
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
