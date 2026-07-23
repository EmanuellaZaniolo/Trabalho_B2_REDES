Catálogo de Recomendações
Descrição da Aplicação
Sistema web completo para cadastro, listagem e gerenciamento de recomendações de obras (músicas, filmes, séries, livros, jogos e podcasts). A aplicação demonstra a containerização e orquestração de múltiplos serviços utilizando Docker Compose, com isolamento de rede, persistência de dados e segurança através de Proxy Reverso.
Tema Escolhido
Catálogo de Recomendações - Uma aplicação que permite aos usuários adicionar e visualizar suas obras favoritas, com categorização e observações pessoais.
Arquitetura
A aplicação é composta por três serviços containerizados:
Serviço
Tecnologia
Função
Frontend
Nginx + HTML/CSS/JavaScript
Interface web responsiva com Proxy Reverso
Backend
Node.js + Express
API REST (acessível apenas via Nginx)
Banco de Dados
PostgreSQL 15
Persistência de dados em volume nomeado
Isolamento de Rede e Segurança
A aplicação utiliza duas redes isoladas e implementa Proxy Reverso para máxima segurança:
rede_front (rede externa): Conecta Frontend e Backend
rede_db (rede interna): Conecta Backend e Banco de Dados com internal: true
Fluxo de Comunicação:
Plain Text
Navegador (Host)
    ↓
    localhost:8080 (ÚNICA porta exposta)
    ↓
Frontend (Nginx com Proxy Reverso)
    ├→ /                    → Serve index.html
    └→ /api/*               → Repassa para Backend (http://backend:3000 )
         ↓
    Backend (SEM porta exposta para o host)
         ↓
    rede_db (interna)
         ↓
    PostgreSQL (SEM porta exposta)
Benefícios da Implementação
✅ Segurança Máxima: Apenas a porta 8080 é exposta. Backend e Banco de Dados são completamente inacessíveis de fora.

✅ Isolamento Total: Redes separadas garantem que Frontend não acessa Banco de Dados.

✅ Proxy Reverso: Nginx gerencia toda a comunicação com o Backend.

✅ Persistência: Volume nomeado garante dados após restart.
Requisitos Técnicos Atendidos
✅ Frontend: Container com Dockerfile próprio, Proxy Reverso implementado

✅ Backend: Container com endpoints CRUD (GET, POST), SEM porta exposta

✅ Banco de Dados: Imagem oficial PostgreSQL com volume nomeado

✅ Docker Compose: Arquivo único com três serviços

✅ Isolamento de Rede: Redes separadas com internal: true

✅ Persistência: Dados mantidos após docker compose down e up

✅ Porta Única Exposta: Apenas 8080 (Frontend)