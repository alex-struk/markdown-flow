FROM node:18

WORKDIR /home/apiServer
COPY package.json .
RUN npm install
COPY . .

EXPOSE 8080

CMD ["/bin/sh", "entrypoint.sh"] 