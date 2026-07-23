const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Nosso "banco de dados" temporário na memória
let recomendacoes = [];

// Rota para buscar todas as recomendações
app.get('/api/recomendacoes', (req, res) => {
    res.json(recomendacoes);
});

// Rota para adicionar uma nova recomendação
app.post('/api/recomendacoes', (req, res) => {
    const { titulo, categoria, observacao } = req.body;

    // Validação simples
    if (!titulo || !categoria || !observacao) {
        return res.status(400).json({ error: 'Título, categoria e observação são obrigatórios.' });
    }

    // Cria o objeto da recomendação (repare que não há mais "curtidas")
    const novaRecomendacao = {
        id: Date.now(),
        titulo,
        categoria,
        observacao
    };

    recomendacoes.push(novaRecomendacao);
    res.status(201).json(novaRecomendacao);
});

// Removemos as antigas rotas de POST/PUT que adicionavam curtidas

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor de Recomendações rodando na porta ${PORT} 🚀`);
});