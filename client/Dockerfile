FROM node:20 AS builder
WORKDIR /app

RUN rm -rf /app/*

COPY package*.json ./
COPY vite.config.* ./
RUN npm install

COPY . .
RUN npm run build
