FROM node:18-alpine

WORKDIR /usr/src/app

ENV NODE_ENV production

COPY package.json .
RUN npm install
COPY . .

EXPOSE 8080

CMD ["/bin/sh", "entrypoint.sh"] 
# CMD [ "node", "./bin/www" ]