FROM node:20

ARG NODE_ENV=development
ARG VITE_HOST_URL
ARG VITE_LIVEKIT_URL

WORKDIR /app

RUN corepack enable && corepack prepare yarn@4.3.0 --activate

COPY . .

RUN yarn install
RUN yarn build

CMD ["yarn", "dlx", "serve", "-s", "dist", "-l", "8080"]
