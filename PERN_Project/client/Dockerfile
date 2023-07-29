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
COPY . ./
RUN npm install 
# EXPOSE 5173
CMD ["npm", "run", "dev"]