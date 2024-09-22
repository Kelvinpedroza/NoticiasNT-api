# Usa uma imagem base do Node.js
FROM node:16

# Define o diretório de trabalho na imagem
WORKDIR /app

# Copia o package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos da aplicação
COPY . .

# Compila o código (se necessário)
RUN npm run build

# Expõe a porta na qual a aplicação irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run"]
