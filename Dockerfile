FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

COPY .npmrc ./

RUN npm i

RUN npm i pm2 @babel/cli @babel/node @babel/core @babel/preset-env sequelize-cli -g

COPY . .

RUN rm .npmrc

EXPOSE 8000

CMD ["pm2-runtime", "start", "ecosystem.config.js", "--only", "api"]
