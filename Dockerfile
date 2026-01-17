FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

RUN npm install -g typescript ts-node nodemon

COPY prisma ./prisma/
RUN npx prisma generate

COPY . .
RUN npm rebuild || true

EXPOSE 5550

# Use production start command
CMD ["npm", "run", "start"]
