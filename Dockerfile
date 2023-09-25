FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY dist/ ./

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]


