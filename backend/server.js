import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const app = express();

app.use(express.json());

app.post("/api/products", async (req, res) => {
	const product = req.body;

	if (!product.name || !product.price || !product.image) {
		return res.status(400).json({
			success: false,
			message: "Favor preencher todos os campos.",
		});
	}

	const newProduct = new Product(product);

	try {
		await newProduct.save();
		res.status(201).json({
			success: true,
			data: newProduct,
		});
	} catch (error) {
		console.error("Erro ao criar produto: ", error.message);
		res.status(500).json({
			success: false,
			message: "Erro no servidor.",
		});
	}
});

const PORTA = 5000;

app.listen(PORTA, () => {
	connectDB();
	console.log(`Servidor iniciado na porta ${PORTA}`);
});
