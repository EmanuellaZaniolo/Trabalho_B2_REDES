FROM nginx:alpine

# Copiar a configuração do Nginx com Proxy Reverso
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar os arquivos estáticos
COPY index.html /usr/share/nginx/html/index.html
COPY fundoLista.jpg /usr/share/nginx/html/fundoLista.jpg

EXPOSE 80
