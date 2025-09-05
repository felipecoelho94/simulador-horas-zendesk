import express from 'express';
import routes from './routes.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/api', routes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is healthy' });
});

app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});