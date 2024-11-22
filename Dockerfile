FROM node:22.2.0
# Crea el directorio y asegúrate de que sea accesible
WORKDIR /app
RUN npm install -g @quasar/cli
COPY . .
EXPOSE 9000
CMD ["quasar", "dev"]
