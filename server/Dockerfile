FROM node:lts-alpine3.20

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . ./

EXPOSE 1111

CMD ["npm", "start"]
