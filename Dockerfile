# Build project

FROM node:20-alpine AS build

WORKDIR /usr/src/dummybank/api

COPY . .

RUN yarn install

RUN yarn build

# Build image

FROM node:20-alpine

WORKDIR /usr/src/dummybank/api

COPY --from=build /usr/src/dummybank/api/dist .

RUN yarn install

CMD ["yarn", "start:prod"]
