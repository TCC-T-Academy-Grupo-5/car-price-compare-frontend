FROM node:18

WORKDIR /app

RUN npm install -g @angular/cli

COPY package*.json ./

RUN rm -rf node_modules && npm install

COPY . .

RUN ng cache clean && ng build --configuration production --output-hashing=all --aot

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
