FROM node:20

WORKDIR /app

COPY . .

RUN npm install
EXPOSE 3000
CMD ["npm", "run", "start:dev"]

# docker build -t nodejs-app .