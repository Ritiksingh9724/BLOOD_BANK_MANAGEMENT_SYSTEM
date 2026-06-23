const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");

// DATABASE
const connectDB = require("./config/db");

// ROUTES
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const donorRoutes = require("./routes/donorRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const requestRoutes = require("./routes/requestRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

// CONFIG
dotenv.config();

// DATABASE CONNECTION
connectDB();

// EXPRESS APP
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// HOME ROUTE
app.get("/", (req, res) => {
  res.send("<h1>Blood Bank Server Running</h1>");
});

// ============================
// API ROUTES
// ============================

// Auth
app.use("/api/v1/auth", authRoutes);

// Dashboard
app.use("/api/v1/dashboard", dashboardRoutes);

// Donor
app.use("/api/v1/donor", donorRoutes);

// Inventory
app.use("/api/v1/inventory", inventoryRoutes);

// Hospital
app.use("/api/v1/hospital", hospitalRoutes);

// Request
app.use("/api/v1/request", requestRoutes);

// Payment
app.use("/api/v1/payment", paymentRoutes);

// ============================
// PORT
// ============================

const PORT = process.env.PORT || 5000;

// SERVER START
app.listen(PORT, () => {
  console.log(
    `Server Running on Port ${PORT}`.bgGreen.white
  );
});