FROM node:18-alpine3.20

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
RUN corepack enable
RUN corepack prepare yarn@4.6.0 --activate
COPY . .
RUN yarn

EXPOSE 5858
CMD ["yarn", "dev"]
