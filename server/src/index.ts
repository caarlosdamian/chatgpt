import 'dotenv/config';
import express, { json } from 'express';
import router from './routes';
import cors from 'cors';
import connectToDb from './utils/connectToDb';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(json());
app.use(router);
app.listen(PORT, () => {
  console.log(`Server running port ${PORT}`);
  connectToDb();
});
