import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import emailRoutes from "./routes/email.routes";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./configs/swagger";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", emailRoutes);

// Swagger UI route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;