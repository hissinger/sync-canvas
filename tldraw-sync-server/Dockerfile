FROM node:18-alpine3.20 AS builder

WORKDIR /app

RUN corepack enable
RUN corepack prepare yarn@4.6.0 --activate

COPY package.json yarn.lock .yarnrc.yml .yarn/ ./
RUN yarn install --immutable

COPY . .
RUN yarn build

FROM node:18-alpine3.20

WORKDIR /app

RUN corepack enable
RUN corepack prepare yarn@4.6.0 --activate

COPY package.json yarn.lock .yarnrc.yml .yarn/ ./
RUN yarn workspaces focus --production --all

COPY --from=builder /app/dist ./dist

EXPOSE 5858
CMD ["node", "dist/server.js"]
