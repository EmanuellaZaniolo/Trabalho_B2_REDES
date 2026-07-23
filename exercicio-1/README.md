Emanuella Bedim Zaniolo - exercicio 1 REDES
# Catálogo de Recomendações

Sistema simples de cadastro, listagem, edição e remoção de recomendações (filmes, séries, músicas, livros, jogos e podcasts).

## Como rodar
1. Abra o terminal na raiz do projeto (pasta `exercicio-1`).
2. Execute o comando: `docker compose up -d`
3. Acesse no navegador: `http://localhost:8080`

## Arquitetura
- **Frontend (Nginx)**: interface web em HTML/JS, servida em `http://localhost:8080`. O próprio Nginx faz
  o *proxy reverso* das chamadas `/api/*` para o container do backend (`http://backend:3000`), usando o
  DNS interno do Docker — o navegador nunca acessa o backend diretamente.
- **Backend (Node.js/Express)**: API com CRUD completo (`GET`, `POST`, `PUT`, `DELETE` em `/api/recomendacoes`).
- **Banco de Dados (PostgreSQL)**: persiste os dados no volume nomeado `db_data`.

## Redes
- `rede_front`: conecta `frontend` e `backend`.
- `rede_db` (`internal: true`): conecta `backend` e `db`, sem saída para fora do cluster de containers.

O `backend` participa das duas redes, servindo de intermediário. O `db` não expõe nenhuma porta para o
host e não é acessível a partir do `frontend` (redes diferentes).

## Persistência
Os dados ficam no volume nomeado `db_data`. Após `docker compose down` seguido de `docker compose up`,
os registros cadastrados continuam disponíveis.
