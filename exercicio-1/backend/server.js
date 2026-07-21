const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conexão com o banco de dados
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

// Inicialização e criação das tabelas no PostgreSQL
async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS songs (
      id SERIAL PRIMARY KEY,
      title VARCHAR(100) NOT NULL,
      artist VARCHAR(100) NOT NULL,
      likes INT DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS comments (
      id SERIAL PRIMARY KEY,
      song_id INT REFERENCES songs(id) ON DELETE CASCADE,
      text TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}
initDb().catch(err => console.error("Erro ao inicializar banco:", err));

// 1. LISTAR MÚSICAS (com curtidas e comentários)
app.get('/songs', async (req, res) => {
  try {
    const songsRes = await pool.query('SELECT * FROM songs ORDER BY id DESC');
    const commentsRes = await pool.query('SELECT * FROM comments ORDER BY id ASC');
    
    // Associa os comentários a cada música
    const songs = songsRes.rows.map(song => ({
      ...song,
      comments: commentsRes.rows.filter(c => c.song_id === song.id)
    }));
    
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. CRIAR MÚSICA
app.post('/songs', async (req, res) => {
  const { title, artist } = req.body;
  try {
    await pool.query('INSERT INTO songs (title, artist) VALUES ($1, $2)', [title, artist]);
    res.status(201).json({ message: "Música adicionada!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. EDITAR MÚSICA
app.put('/songs/:id', async (req, res) => {
  const { id } = req.params;
  const { title, artist } = req.body;
  try {
    await pool.query('UPDATE songs SET title = $1, artist = $2 WHERE id = $3', [title, artist, id]);
    res.json({ message: "Música atualizada!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. DELETAR MÚSICA
app.delete('/songs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM songs WHERE id = $1', [id]);
    res.json({ message: "Música removida!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. CURTIR MÚSICA
app.post('/songs/:id/like', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('UPDATE songs SET likes = likes + 1 WHERE id = $1', [id]);
    res.json({ message: "Música curtida!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. ADICIONAR COMENTÁRIO
app.post('/songs/:id/comments', async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    await pool.query('INSERT INTO comments (song_id, text) VALUES ($1, $2)', [id, text]);
    res.status(201).json({ message: "Comentário adicionado!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Backend rodando na porta 3000'));