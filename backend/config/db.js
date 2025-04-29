import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`Conectado ao MongoDB: ${conn.connection.host}`);
	} catch (error) {
		console.log(`Erro: ${error}`);
		process.exit(1);
	}
};
