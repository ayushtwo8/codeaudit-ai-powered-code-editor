import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config();

import aiRouter from './routes/aiRoute.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/ai', aiRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});