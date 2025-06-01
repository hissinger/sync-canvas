FROM node:20-slim as builder

ARG NODE_ENV=development
ARG VITE_HOST_URL
ARG VITE_LIVEKIT_URL

WORKDIR /app

RUN corepack enable && corepack prepare yarn@4.3.0 --activate

COPY . .

RUN yarn install
RUN apt-get update && apt-get install -y python3 make g++
RUN yarn build

FROM node:20-slim as runner

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./

RUN corepack enable && corepack prepare yarn@4.3.0 --activate
RUN yarn workspaces focus --all --production

CMD ["yarn", "dlx", "serve", "-s", "dist", "-l", "8080"]
