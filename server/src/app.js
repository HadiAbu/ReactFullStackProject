import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import postsRouter from "./routes/posts.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

// Basic security and parsing
app.use(helmet());
// cors
const corsOptions = {
  origin: "*",
  methods: "GET,PUT,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
// we need cors inorder to be able to share resources across different ports and origins
app.use(cors(corsOptions));
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
app.use("/api", (req, res, next) => {
  try {
    if (req.originalUrl === "/api") {
      return res.json({ message: "Welcome to the API" });
    }
  } catch (err) {
    next(err);
  }
});

app.use("/api/posts", postsRouter);

// Healthcheck
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// Error handler (last middleware)
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("✅ Root route working!");
});

export default app;
