FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g expo-cli

COPY . .

RUN npx expo export

EXPOSE 3000

CMD ["npx", "serve", "dist"]
