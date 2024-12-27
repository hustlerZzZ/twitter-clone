import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

const app = express();

app.enable("trust proxy");

// Allowing CORS
app.use(cors());

// Adding security headers
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

// Adding logging
app.use(morgan("dev"));

// Body Parser, reading data from body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Limit request for API
const Limit = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

// API End Points
app.use("/api", Limit);

app.all("*", (req, res) => {
  res.status(404).json({
    status: "error",
    msg: "Route is not found!",
  });
});

export default app;
