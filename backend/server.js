import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();

app.use(express.json());

// Middleware de debugging
// app.use((req, res, next) => {
// 	console.log("Incoming headers:", req.headers);
// 	console.log("Content-Type:", req.get("Content-Type"));
// 	next();
// });

app.use("/api/products", productRoutes);

const PORTA = 5000;

app.listen(PORTA, () => {
	connectDB();
	console.log(`Servidor iniciado na porta ${PORTA}`);
});
