import 'dotenv/config';
import express, { json } from 'express';
import router from './routes';
import cors from 'cors';
import connectToDb from './utils/connectToDb';

const corsOptions = {
  credentials: true,
  origin: ['http://localhost:5173'],
};
const app = express();
app.use(cors(corsOptions));
const PORT = process.env.PORT || 3000;
app.use(json());

app.use(router);

app.listen(PORT, () => {
  console.log(`Server running port ${PORT}`);
  connectToDb();
});
