import http from 'http';
import app from './app.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 5000;

dotenv.config();
const server = http.createServer(app);

mongoose.connect(process.env.MONGO_DB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

const connection = mongoose.connection;

connection.on('open', () => {
	console.log('Connection to MongoDB Atlas established successfully');
});

server.listen(PORT, () => console.log('Server running at PORT: ', PORT));
