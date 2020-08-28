const express = require('express');
const cors = require('cors');
// calling body-parser to handle the Request Object from POST requests
const bodyParser = require('body-parser');

// initialize the express server
const app = express();

// set cors
app.use(cors());
// you can parse incoming Request Object if object, with nested objects, or generally any type.
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
	res.send('Welcome!');
});

module.exports = app;

