# default

## docker setup

```
# build
docker build -t image-name .

# run in background
docker run -d -p xxxx:3000 -rm -v ~docker-node/web:/home/node/app --name container-name image-name 

# run in interactive mode
docker run -it -p xxxx:3000 -rm -v ~docker-node/web:/home/node/app --name container-name image-name sh
```

<!-- ### Compiles and hot-reloads for development

```
# yarn
yarn dev

# npm
npm run dev

# pnpm
pnpm dev
```

### Compiles and minifies for production

```
# yarn
yarn build

# npm
npm run build

# pnpm
pnpm build
```

### Customize configuration

See [Configuration Reference](https://vitejs.dev/config/). -->
