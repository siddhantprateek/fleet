import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import { router } from './routes/user.routes';
import morgan from 'morgan';
import { prisma } from './config/postgres/postgres';
//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

// @connectors
const postgresClient = async () => {
  try {
    await prisma.$connect();
    console.log("connected to PostgreSQL database");
    return prisma;
  } catch (error) {
    console.error("Error connecting to PostgreSQL database:", error);
    throw error; 
  }
}
postgresClient()
  .then((prismaInstance) => {
    console.log("Prisma is connected to the database");
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });

// @middlewares
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
      message: "fleet REST server",
      health: "ok"
  })
})

app.use('/api', router)

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});