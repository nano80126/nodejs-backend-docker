FROM mongo:5.0.8

ENV MONGO_INITDB_ROOT_USERNAME=root
ENV MONGO_INITDB_ROOT_PASSWORD=0000

COPY ./mongo-init.js /docker-entrypoint-initdb.d/mongo-init.js
