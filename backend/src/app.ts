import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import userRoutes from "./routes/userRoutes";

const app = express();

// Allowing CORS
const corsConfig = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsConfig));

// Body Parser, reading data from body
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));

// Adding security headers
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

// Adding logging
app.use(morgan("dev"));

// Passport Middleware
app.use(passport.initialize());

// Limit request for API
const Limit = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

// API End Points
app.use("/api", Limit);

app.use("/api/v1/user", userRoutes);

app.all("*", (req, res) => {
  res.status(404).json({
    status: "error",
    msg: "Route is not found!",
  });
});

export default app;
