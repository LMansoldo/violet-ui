FROM node:lts

ARG ARG_DIR=/app

WORKDIR $ARG_DIR

COPY . .

RUN npm install && npm run build && npm run start

EXPOSE 6006

ENV HOST=0.0.0.0

CMD [ "build" ]