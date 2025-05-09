import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
	try {
		const products = await Product.find({});
		res.status(200).json({
			success: true,
			data: products,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error,
		});
	}
};

export const createProduct = async (req, res) => {
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
};

export const updateProduct = async (req, res) => {
	const { id } = req.params;

	const product = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({
			success: false,
			message: "ID inválido.",
		});
	}

	try {
		const updatedProduct = await Product.findByIdAndUpdate(id, product, {
			new: true,
			runValidators: true,
		});
		if (!updatedProduct) {
			return res.status(404).json({
				success: false,
				message: "Produto não encontrado.",
			});
		}
		res.status(200).json({
			success: true,
			data: updatedProduct,
		});
	} catch (error) {
		console.error("Erro ao atualizar produto: ", error.message);
		res.status(500).json({
			success: false,
			message: "Erro no servidor.",
		});
	}
};

export const deleteProduct = async (req, res) => {
	const { id } = req.params;
	try {
		await Product.findByIdAndDelete(id);
		res.status(200).json({
			success: true,
			message: "Produto excluído.",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: `Erro na requisição: ${error}`,
		});
	}
};
