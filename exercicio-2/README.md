# Navidrome - Servidor de Música Pessoal

O [Navidrome](https://www.navidrome.org/) é um servidor open-source que permite hospedar sua própria coleção de músicas e ouvi-la via navegador ou aplicativos mobile.

## Como rodar
1. Na raiz da pasta, execute: `docker compose up -d`
2. Acesse a aplicação em: `http://localhost:4533`
3. Na primeira vez que você acessar, ele pedirá para criar um usuário admin (os dados ficam salvos permanentemente graças ao volume).

## Configurações realizadas
- **Imagem Oficial**: `deluan/navidrome:latest` do Docker Hub.
- **Volumes**:
  - `navidrome_data`: Salva o banco interno SQLite e os usuários.
  - `navidrome_music`: Mapeia a pasta onde os arquivos `.mp3` ficariam.
- **Variáveis (.env)**: Configuram o tempo de expiração da sessão, habilitam transcodificação de arquivos e definem o tema escuro como padrão.