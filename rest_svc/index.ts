import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import { routes } from './routes/routes';
import morgan from 'morgan';
//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

// middlewares
app.use(express.json())
app.use(morgan('dev'))

app.use('/api', routes)

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});