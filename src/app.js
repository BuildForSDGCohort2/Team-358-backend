const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// initialize the express server
const app = express();

// set cors
app.use(cors());
// you can parse incoming Request Object if object, with nested objects, or generally any type.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

const authRoutes = require('./routes/auth');

app.get('/', function (req, res) {
	res.send('Welcome!');
});

app.use('/auth', authRoutes);
app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500).json({
		error: {
			message: error.message,
		},
	});
});

module.exports = app;
