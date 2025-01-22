import app from "./app";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "config.env" });

const DB = process.env.DB!;
const PORT = process.env.PORT!;

mongoose.connect(DB).then(() => console.log("DB connection success!"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
