import express from 'express';
import userRoutes from './routes/user';
import 'dotenv/config';

const app = express();
app.use(express.json());

app.use('/api', userRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});