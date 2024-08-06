import 'dotenv/config';
import express from 'express';
import router from './routes';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(router);
app.listen(PORT, () => {
  console.log(`Server running port ${PORT}`);
});
