# Use uma imagem base
FROM node:14

# Defina o diretório de trabalho
WORKDIR /app

# Copie arquivos do projeto
COPY package*.json ./
RUN npm install
COPY . .

# Exponha a porta na qual a aplicação vai rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]