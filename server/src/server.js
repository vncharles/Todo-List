import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
// import db from "./models/index";
// import { connectDB, migrateDB } from "./models/index";
import apiRouter from './routes/router';

const app = express();
const port = 8080;

app.use(helmet());
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());

// connectDB();
// migrateDB();

app.use('/api', apiRouter);

app.get('*', (req, res) => {
	res.status(403).json({
		message: 'page not found',
	});
});

app.listen(port, () => {
	console.log(`Example app listening http://localhost:${port}`);
});
