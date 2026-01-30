let books = [
  {
    id: "B001",
    title: "Azərbaycanda Işıq",
    author: "Saməd Vurğun",
    category: "Bədii ədəbiyyat",
    price: 15.99,
    stock: 45,
    status: "Aktiv",
    isbn: "978-9944-0-1234-5",
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

const getBooks = () => books;
const setBooks = (newBooks) => (books = newBooks);

const getOrders = () => orders;
const setOrders = (newOrders) => (orders = newOrders);

module.exports = { getBooks, setBooks, getOrders, setOrders };
