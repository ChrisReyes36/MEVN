import "dotenv/config";
import express from "express";
import cors from "cors";
import "./src/database/connectdb.js";
import authRoutes from "./src/routes/auth.routes.js";

// Server
const app = express();

/// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/api/v1/auth", authRoutes);

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🔥 Server running on port ${PORT}: http://localhost:${PORT} 🔥`)
);
