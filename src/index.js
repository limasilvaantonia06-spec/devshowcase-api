import express from 'express';
import cors from 'cors';
import { sequelize } from './config/database.js';
import projectRoutes from './routes/projects.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'DevShowcase API - Etapa 1 OK' });
});

app.use('/projects', projectRoutes);

async function start() {
  try {
    await sequelize.sync();
    console.log('Banco conectado');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar:', error);
  }
}

start();
