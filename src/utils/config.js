// to read the .env file
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	dbURI: process.env.MONGO_DB_URI,
	salt: process.env.MONGO_ATLAS_PW,
};
