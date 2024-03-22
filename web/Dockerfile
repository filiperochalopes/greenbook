FROM node:20-alpine as build_stage

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY ./web/package.json .

RUN yarn

COPY ./web .

RUN yarn build

FROM nginx:1.16.0-alpine

COPY --from=build_stage /home/node/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]