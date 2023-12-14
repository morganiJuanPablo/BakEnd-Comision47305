FROM node:14-alpine

WORKDIR /appFoofighters

COPY package*.json ./

RUN npm install

RUN npm rebuild bcrypt --build-from-source

COPY . .

EXPOSE 8080

CMD ["npm", "run", "start-prod"]