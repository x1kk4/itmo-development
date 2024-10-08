FROM cr.vnuk.tech/library/node:21.13-alpine3.20-v1

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g expo-cli

COPY . .

RUN npx expo export

EXPOSE 3000

CMD ["npx", "serve", "dist"]
