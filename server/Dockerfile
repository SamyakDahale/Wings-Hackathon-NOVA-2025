FROM node:18-alpine

WORKDIR /server

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 5000
CMD ["node", "server.js"]
