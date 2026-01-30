const express = require("express");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "libraff_books",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage: storage });

const PORT = process.env.PORT || 5001;

// Mock Data
let books = [
  {
    id: "B001",
    title: "Azərbaycanda Işıq",
    author: "Samad Vurğun",
    category: "Bədii ədəbiyyat",
    price: 15.99,
    stock: 45,
    status: "Aktiv",
    isbn: "978-9944-0-1234-5",
    publisher: "Azərbaycan Nəşriyyatı",
    year: 2020,
    coverColor: "from-purple-600 to-pink-600",
    image:
      "https://www.libraff.az/images/thumbnails/400/600/from_1c/f8a032c0-5053-11eb-a4d2-503eaa128442_1_1759181531.jpg.webp",
  },
  {
    id: "B002",
    title: "Kiçik Şəhər Xəyalları",
    author: "Məhəmməd Hadi",
    category: "Romanlar",
    price: 12.5,
    stock: 28,
    status: "Aktiv",
    isbn: "978-9944-0-5678-9",
    publisher: "Libraff Nəşriyyatı",
    year: 2021,
    coverColor: "from-blue-600 to-cyan-600",
    image:
      "https://www.libraff.az/images/thumbnails/400/600/from_1c/defda021-995c-11ef-a630-3051a8080351_1_1730623696.jpg.webp",
  },
];

let orders = [
  {
    id: "O001",
    customerName: "Aylin Əliyeva",
    customerEmail: "aylin@email.com",
    customerPhone: "+994 50 123 45 67",
    address: "Bakı, Nəsimi, Ə. Rəcəbli 123",
    items: [{ bookTitle: "Azərbaycanda Işıq", quantity: 2, price: 15.99 }],
    totalPrice: 31.98,
    status: "Tamamlandı",
    createdAt: "2024-01-15",
  },
];

// Upload Route
app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({ url: req.file.path });
});

// Books Routes
app.get("/api/books", (req, res) => {
  res.json(books);
});

app.post("/api/books", (req, res) => {
  const newBook = { id: `B${Date.now()}`, ...req.body };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put("/api/books/:id", (req, res) => {
  const { id } = req.params;
  books = books.map((b) => (b.id === id ? { ...b, ...req.body } : b));
  res.json(books.find((b) => b.id === id));
});

app.delete("/api/books/:id", (req, res) => {
  const { id } = req.params;
  books = books.filter((b) => b.id !== id);
  res.status(204).send();
});

// Orders Routes
app.get("/api/orders", (req, res) => {
  res.json(orders);
});

app.patch("/api/orders/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  orders = orders.map((o) => (o.id === id ? { ...o, status } : o));
  res.json(orders.find((o) => o.id === id));
});

app.delete("/api/orders/:id", (req, res) => {
  const { id } = req.params;
  orders = orders.filter((o) => o.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
