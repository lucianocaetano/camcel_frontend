FROM node:22.2.0
WORKDIR /app
COPY package*.json ./
RUN npm install -g @quasar/cli
RUN npm install
COPY . .
EXPOSE 9000
CMD ["quasar", "dev"]
