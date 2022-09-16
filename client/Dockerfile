FROM node:alpine

RUN mkdir -p /home/app

COPY ./package.json /home/app
COPY ./package-lock.json /home/app
COPY ./ /home/app

WORKDIR /home/app

# will execute npm install in /home/app because of WORKDIR
RUN npm i

CMD ["npm", "start"]