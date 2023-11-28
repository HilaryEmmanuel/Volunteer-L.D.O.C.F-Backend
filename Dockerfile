# Base Image
FROM node:18-alpine 

WORKDIR C:\Users\user\Desktop\Project Starters\Express-js Starter-Ts

COPY package*.json ./

COPY . .

RUN npm install 

CMD ["node", "src/index.js"]

EXPOSE 5000