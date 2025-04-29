import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

app.get("/products", (req, res) => {
	res.send("Server is ready");
});

const PORTA = 5000;

app.listen(PORTA, () => {
	connectDB();
	console.log(`Servidor iniciado na porta ${PORTA}`);
});
