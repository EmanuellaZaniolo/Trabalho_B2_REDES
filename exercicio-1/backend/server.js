const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

app.get('/api/recomendacoes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM recomendacoes ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar recomendações');
  }
});

app.post('/api/recomendacoes', async (req, res) => {
  const { titulo, categoria, observacao } = req.body;
  if (!titulo || !categoria || !observacao) return res.status(400).send('Dados incompletos');

  try {
    await pool.query(
      'INSERT INTO recomendacoes (titulo, categoria, observacao) VALUES ($1, $2, $3)', 
      [titulo, categoria, observacao]
    );
    res.status(201).send('Recomendação adicionada');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao salvar no banco');
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`));