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

// CREATE + READ (mínimo exigido)
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
    const result = await pool.query(
      'INSERT INTO recomendacoes (titulo, categoria, observacao) VALUES ($1, $2, $3) RETURNING *',
      [titulo, categoria, observacao]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao salvar no banco');
  }
});

// UPDATE + DELETE (CRUD completo)
app.put('/api/recomendacoes/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, categoria, observacao } = req.body;
  if (!titulo || !categoria || !observacao) return res.status(400).send('Dados incompletos');

  try {
    const result = await pool.query(
      'UPDATE recomendacoes SET titulo = $1, categoria = $2, observacao = $3 WHERE id = $4 RETURNING *',
      [titulo, categoria, observacao, id]
    );
    if (result.rowCount === 0) return res.status(404).send('Recomendação não encontrada');
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao atualizar recomendação');
  }
});

app.delete('/api/recomendacoes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM recomendacoes WHERE id = $1', [id]);
    if (result.rowCount === 0) return res.status(404).send('Recomendação não encontrada');
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao remover recomendação');
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`));
