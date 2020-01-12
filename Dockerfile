FROM node:15.4.0-alpine AS builder

COPY . /nakarte/
RUN set -ex && (cd /nakarte && yarn && yarn build)

FROM nginx:1.19.5-alpine

COPY --from=builder /nakarte/build/ /usr/share/nginx/html/
