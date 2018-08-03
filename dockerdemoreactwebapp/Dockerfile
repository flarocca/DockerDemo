FROM node:latest

ENV NPM_CONFIG_LOGLEVEL warn

EXPOSE 5000

COPY package.json package.json
COPY npm-shrinkwrap.json npm-shrinkwrap.json
RUN npm install

COPY . .

RUN npm run build --production

ENTRYPOINT [ "node", "server" ]