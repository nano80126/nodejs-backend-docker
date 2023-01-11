FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn global add @nestjs/cli

RUN yarn install 
# && yarn cache clean

COPY . .

EXPOSE 4000

# CMD ["yarn", "dev"]

# FROM base as production

# ENV NODE_PATH=./dist

# RUN yarn build