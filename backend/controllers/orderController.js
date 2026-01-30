const { getOrders, setOrders } = require("../data/mockData");

const getAllOrders = (req, res) => {
  res.json(getOrders());
};

const updateOrderStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  let orders = getOrders();
  orders = orders.map((o) => (o.id === id ? { ...o, status } : o));
  setOrders(orders);
  res.json(orders.find((o) => o.id === id));
};

const deleteOrder = (req, res) => {
  const { id } = req.params;
  let orders = getOrders();
  orders = orders.filter((o) => o.id !== id);
  setOrders(orders);
  res.status(204).send();
};

module.exports = { getAllOrders, updateOrderStatus, deleteOrder };
