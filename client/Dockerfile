FROM node:20 AS builder

WORKDIR /app

RUN corepack enable && corepack prepare yarn@4.3.0 --activate

COPY . .

RUN yarn install
RUN yarn build

CMD ["yarn", "dlx", "serve", "-s", "dist", "-l", "8080"]
