# Dockerfile
FROM buildkite/puppeteer:latest
RUN mkdir /app
WORKDIR /app
COPY package.json ./
RUN yarn && yarn cache clean
COPY . .