FROM node:20-alpine

ARG DB_PASS
ARG DB_USER
ARG DB_HOST
ARG DB_PASS

ARG DATABASE_URL="postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:5432/${DB_NAME}?schema=public"
RUN echo "DATABASE_URL: $DATABASE_URL"

COPY . /app
WORKDIR /app/src

RUN yarn

WORKDIR /app

RUN chmod +x start.sh

CMD sh ./start.sh