# FROM node:17-alpine as builder
# WORKDIR /app
# COPY package.json .
# COPY package-lock.json .
# RUN npm install
# COPY . .
# RUN npm run build 

FROM node 
WORKDIR /client 
COPY package.json ./
RUN npm install
COPY . ./
# CMD ["npm", "run", "dev"]
