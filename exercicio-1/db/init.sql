CREATE TABLE IF NOT EXISTS recomendacoes (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    observacao TEXT NOT NULL
);