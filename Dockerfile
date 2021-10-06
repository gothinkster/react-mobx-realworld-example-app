FROM node:11.5.0 as build
WORKDIR /app
COPY package*.json  ./
RUN npm install
COPY . ./

FROM node:11.5.0 as app
WORKDIR /app
COPY --from=build /app/ ./
CMD ["npm", "start"]
