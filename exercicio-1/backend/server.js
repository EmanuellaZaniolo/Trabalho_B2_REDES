const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = 3000;

// Configuração da conexão com o PostgreSQL usando variáveis de ambiente
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
});

// Middlewares
app.use(cors());
app.use(express.json());

// Rota para buscar todas as recomendações do banco de dados
app.get('/api/recomendacoes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM recomendacoes ORDER BY data_criacao DESC');
        res.json(result.rows);
    } catch (err) {
        console.error('Erro ao buscar recomendações:', err);
        res.status(500).json({ error: 'Erro ao buscar recomendações no banco de dados.' });
    }
});

// Rota para adicionar uma nova recomendação no banco de dados
app.post('/api/recomendacoes', async (req, res) => {
    const { titulo, categoria, observacao } = req.body;

    // Validação simples
    if (!titulo || !categoria || !observacao) {
        return res.status(400).json({ error: 'Título, categoria e observação são obrigatórios.' });
    }

    try {
        const query = 'INSERT INTO recomendacoes (titulo, categoria, observacao) VALUES ($1, $2, $3) RETURNING *';
        const values = [titulo, categoria, observacao];
        const result = await pool.query(query, values);
        
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao salvar recomendação:', err);
        res.status(500).json({ error: 'Erro ao salvar recomendação no banco de dados.' });
    }
});

// Inicia o servidor
// Teste de conexão com o banco de dados
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Erro ao conectar ao banco de dados:', err.stack);
    }
    console.log('Conexão com o banco de dados estabelecida com sucesso! 🐘');
    release();
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor de Recomendações rodando na porta ${PORT} 🚀`);
});
