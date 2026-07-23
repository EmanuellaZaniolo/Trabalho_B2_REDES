# Linkding - Gerenciador de Marcadores (Bookmarks)

Imagem utilizada: [`sissbruecker/linkding`](https://hub.docker.com/r/sissbruecker/linkding)

O [linkding](https://github.com/sissbruecker/linkding) é uma aplicação web open-source para organizar,
marcar com tags e pesquisar links salvos (bookmarks), funcionando como um "favoritos" centralizado
acessível de qualquer navegador.

## Como executar

1. Copie o arquivo de exemplo e ajuste a senha do administrador:
   ```bash
   cp .env.example .env
   # edite o .env e troque LD_SUPERUSER_PASSWORD por uma senha sua
   ```
2. Na raiz desta pasta, execute:
   ```bash
   docker compose up -d
   ```
3. Acesse a aplicação em: `http://localhost:9090`
4. Faça login com o usuário administrador definido no `.env`.

O único passo manual é o preenchimento prévio do `.env` (copiar do `.env.example`), conforme previsto no
enunciado. O usuário administrador é criado automaticamente na primeira inicialização a partir das
variáveis definidas nesse arquivo.

## Configurações realizadas

- **Imagem oficial**: `sissbruecker/linkding:1.45.0`, publicada no Docker Hub.
- **Porta**: apenas a porta `9090` (interface web) é exposta para o host.
- **Volume nomeado**: `linkding_data`, mapeado em `/etc/linkding/data` dentro do container. É onde o
  linkding guarda seu banco de dados SQLite com todos os bookmarks, tags e usuários — garantindo que os
  dados sobrevivam a um `docker compose down` seguido de `docker compose up`.
- **Variáveis de ambiente (`.env`)**:
  - `LD_SUPERUSER_NAME`, `LD_SUPERUSER_PASSWORD`, `LD_SUPERUSER_EMAIL`: criam automaticamente o usuário
    administrador no primeiro start (sem precisar rodar comandos manuais dentro do container).
  - `LD_DISABLE_BACKGROUND_TASKS`: desativa a criação automática de snapshots no Wayback Machine para
    cada bookmark salvo (opcional, mantido desativado para simplificar).

## Testando a persistência dos dados

1. Suba o ambiente e faça login.
2. Adicione alguns bookmarks pela interface.
3. Rode:
   ```bash
   docker compose down
   docker compose up -d
   ```
4. Acesse novamente `http://localhost:9090` e confirme que os bookmarks continuam lá — os dados
   persistem graças ao volume nomeado `linkding_data`.
