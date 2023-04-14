FROM node:18-alpine

WORKDIR /home/node/app

COPY package*.json yarn.lock ./

RUN yarn install 
# && yarn cache clean

COPY . .

EXPOSE 3000

# CMD ["yarn", "dev"]

# FROM base as production

# ENV NODE_PATH=./dist

# RUN yarn build