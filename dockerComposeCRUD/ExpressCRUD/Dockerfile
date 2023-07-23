FROM node
COPY package*.json .
# WORKDIR ./app
ENV APP_PORT=3000
RUN npm install 
COPY . .
CMD npm run dev

# FROM node
# WORKDIR /app
# COPY package.json .
# RUN npm install --quiet
# COPY . .
# --------compose ------------
    # build: .
    #   command: npm run dev
    #   volumes:
    #     - ./:/app
    #     - /app/node_modules
    #   ports: 
    #     - 3000:3000
    #   depends_on:
    #     - db

# FROM node
# WORKDIR /app
# COPY package*.json /app
# ENV APP_PORT=3000
# RUN npm install 
# RUN npm install -g nodemon
# COPY . /app
# CMD npm run dev

