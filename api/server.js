const express = require("express");
const app = express();
app.use(express.json());

// "Banco" em memória: some quando você fecha o servidor
const orders = new Map();

// Simula processamento assíncrono
const PROCESSING_DELAY_MS = 4000;

function isValidOrder(body) {
  if (!body) return false;
  const { orderId, customer, total } = body;
  if (typeof orderId !== "string" || orderId.trim() === "") return false;
  if (typeof customer !== "string" || customer.trim() === "") return false;
  if (typeof total !== "number" || Number.isNaN(total) || total <= 0) return false;
  return true;
}

// POST /orders
app.post("/orders", (req, res) => {
  const { orderId } = req.body || {};

  // validação de payload
  if (!isValidOrder(req.body)) {
    return res.status(400).json({
      error: "INVALID_PAYLOAD",
      message: "Campos: orderId(string), customer(string), total(number > 0)",
    });
  }

  // idempotência
  if (orders.has(orderId)) {
    return res.status(409).json({
      error: "DUPLICATE_ORDER",
      message: "orderId já existe (idempotência).",
      orderId,
      status: orders.get(orderId).status,
    });
  }

  // cria pedido como PENDING
  orders.set(orderId, {
    orderId,
    customer: req.body.customer,
    total: req.body.total,
    status: "PENDING",
  });

  // simula worker (assíncrono)
  setTimeout(() => {
    const current = orders.get(orderId);
    if (current && current.status === "PENDING") {
      orders.set(orderId, { ...current, status: "PROCESSED" });
    }
  }, PROCESSING_DELAY_MS);

  return res.status(201).json({
    orderId,
    status: "PENDING",
    message: "Order accepted for async processing",
  });
});

// GET /orders/{orderId}
app.get("/orders/:orderId", (req, res) => {
  const { orderId } = req.params;

  if (!orders.has(orderId)) {
    return res.status(404).json({
      error: "NOT_FOUND",
      message: "Order não encontrada.",
      orderId,
    });
  }

  return res.status(200).json(orders.get(orderId));
});

app.listen(3000, () => {
  console.log("Fake Orders API rodando em http://localhost:3000");
});
