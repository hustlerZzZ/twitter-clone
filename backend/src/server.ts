import app from "./app";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "config.env" });

const DB = process.env.DB || "mongodb://localhost:27017/twitterDB";

mongoose.connect(DB).then(() => console.log("DB connection success!"));

app.listen(6969, () => {
  console.log("Server is running well!");
});
