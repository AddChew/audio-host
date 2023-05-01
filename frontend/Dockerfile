FROM node:14

WORKDIR /app

COPY ./frontend/package*.json ./

RUN npm install

COPY ./frontend .

EXPOSE 3001

CMD ["npm", "run", "start"]