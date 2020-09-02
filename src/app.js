import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import userRoutes from './routes/userRoutes.js';
import home from './routes/home.js';


const app = express();

app.use(cors());

// BODY PARSER MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// MORGAN MIDDLERWARE
app.use(helmet());

// HELMET MIDDLERWARE
let morganFunction = function (tokens, req, res) {
	return [
		tokens.method(req, res),
		tokens.url(req, res),
		tokens.status(req, res),
		tokens.res(req, res, 'content-length'),
		'-',
		tokens['response-time'](req, res),
		'ms',
	].join(' ');
};
app.use(morgan(morganFunction));

// DEFINE ROUTES
home(app);
userRoutes(app);

export default app;
