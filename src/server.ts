import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';

const app = express();
const PORT = 3333;

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});