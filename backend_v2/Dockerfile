FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install
RUN npm run prisma:generate

COPY . .

RUN npm run build


FROM node:20

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client
COPY package.json ./
COPY prisma ./prisma

COPY --from=builder /app/dist ./dist

COPY package.json ./

RUN npm install --omit-dev

EXPOSE 3000

CMD ["node", "dist/src/main.js"]
