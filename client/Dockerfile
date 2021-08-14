FROM node:14

# work directory
WORKDIR /usr/app

# Copy dependencies first for effective caching
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]