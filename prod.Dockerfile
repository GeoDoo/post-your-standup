FROM node:12.18.1-alpine as build

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm ci --only=production

COPY --chown=node:node . .

# Stage - Production
FROM nginx:1.17-alpine
COPY --from=build /home/node/app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]