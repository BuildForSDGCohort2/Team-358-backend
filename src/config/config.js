require('dotenv').config();

module.exports = {
	port: process.env.PORT,
	databaseUrl: process.env.MONGO_DB_URI,
	databasePassword: process.env.MONGO_ATLAS_PW,
	secret: process.env.SECRET,
	EMAIL_ADDRESS: process.env.EMAIL_ADDRESS,
	PASSWORD: process.env.PASSWORD,
};
