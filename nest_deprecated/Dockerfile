FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

# Install app dependencies
RUN yarn install 
# && yarn cache clean

# Bundle app source
COPY . .

EXPOSE 4000

# CMD ["yarn", "dev"]

# FROM base as production

# ENV NODE_PATH=./dist

# RUN yarn build