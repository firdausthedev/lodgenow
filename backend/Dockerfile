FROM node:18-alpine

RUN apk add --no-cache postgresql-client

WORKDIR /app

COPY package.json ./

COPY prisma ./prisma/ 

COPY .env ./

COPY tsconfig.json ./

RUN npm install

COPY . .

EXPOSE 3000
EXPOSE 5555

CMD ["npm", "run", "dev"]

