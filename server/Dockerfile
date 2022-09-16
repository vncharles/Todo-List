FROM node:alpine

RUN mkdir -p /home/app

COPY ./package.json /home/app
COPY ./package-lock.json /home/app
COPY ./ /home/app

WORKDIR /home/app

RUN npm i

# no need for /home/app/server.js because of WORKDIR
CMD ["npm", "start"]