FROM node:12.5-stretch-slim
WORKDIR /view-packages-api
COPY package*.json ./
RUN npm install --ignore-optional --silent
COPY . .
CMD npm run-script test
ENTRYPOINT npm run prod
EXPOSE 8080