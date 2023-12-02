FROM node:18-alpine

RUN apk add --no-cache postgresql-client

WORKDIR /app

COPY package.json ./

COPY prisma ./prisma/ 

COPY .env ./

COPY tsconfig.json ./

COPY wait-for-postgres.sh wait-for-postgres.sh
RUN chmod +x wait-for-postgres.sh

RUN npm install
RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "./wait-for-postgres.sh postgres && npx prisma migrate dev && npm start"]

