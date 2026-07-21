Emanuella Bedim Zaniolo - exercicio 1 REDES
# Catálogo de Músicas

Sistema simples de cadastro e listagem de músicas.

## Como rodar
1. Abra o terminal na raiz do projeto.
2. Execute o comando: `docker compose up -d`
3. Acesse no navegador: `http://localhost:8080`

## Arquitetura
- **Frontend (Nginx)**: Interface web em HTML/JS.
- **Backend (Node.js/Express)**: API intermediária.
- **Banco de Dados (PostgreSQL)**: Persiste os dados (Volume `pgdata`).

O banco de dados roda em uma rede estritamente interna, inacessível para o frontend e sem exposição de portas para o host.