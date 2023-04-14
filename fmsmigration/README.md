# 初始安裝

## Prerequsition

1. docker installed


## Docker

```
# build image
docker build -t nest-temp .
```

```
# enter container
docker run -it -v ~/docker-backend/nest:/usr/src/app nest-temp sh
```

```
# test volumn by mkdir to create a new directory
mkdir test

# remove test directory
rm -r test
```

```
# install modules in container
yarn install
```