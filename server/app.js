import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import postsRouter from "./routes/posts";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

// Basic security and parsing
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10kb" }));

// Logging only in non-test env
if (process.env.NODE_ENV !== "test") app.use(morgan("tiny"));

// Basic rate limiting to protect endpoints
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 120, // requests per IP per window
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Routes
app.use("/api/posts", postsRouter);

// Healthcheck
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// Error handler (last middleware)
app.use(errorHandler);

export default app;
