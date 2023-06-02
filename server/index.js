import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "./src/database/connectdb.js";
import authRoutes from "./src/routes/auth.routes.js";

// Server
const app = express();

/// Middlewares
const whiteList = [process.env.ORIGIN];
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: (origin, callback) => {
      console.log(`😳 Origin: ${origin} 😳`);
      if (!origin || whiteList.includes(origin)) {
        return callback(null, origin);
      }
      return callback(`😒 Error de CORS origin: ${origin} No autorizado 😒`);
    },
    credentials: true,
  })
);
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRoutes);

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🔥 Server running on port ${PORT}: http://localhost:${PORT} 🔥`)
);
