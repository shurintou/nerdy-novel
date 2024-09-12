## build admin
FROM node:22.8.0-alpine as builder

WORKDIR /srv/app

COPY ./package.json .
RUN npm install --omit=dev
RUN npm i vite

COPY . .

## runtime image
RUN npm run build

FROM node:22.8.0-alpine

WORKDIR /workspace

COPY --from=builder /srv/app/.output ./output

CMD node /workspace/output/server/index.mjs
