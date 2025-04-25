import express from 'express';
import cors from 'cors';
import tennisRoutes from './routes/tennisRoutes.js';

const app = express();
const PORT = 3001;

// Configuração do CORS para o frontend
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Rotas
app.use('/api/tenis', tennisRoutes);

// Rota de teste
app.get('/api', (req, res) => {
  res.send('Backend do CRUD de Tênis está operacional!');
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor backend rodando em http://localhost:${PORT}`);
});