import express from "express";
import dotenv from "dotenv";
import emailRoutes from "./routes/email.routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api", emailRoutes);


export default app;