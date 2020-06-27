FROM node:12.18.1 as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

# Stage - Production
FROM nginx:1.17-alpine
COPY --from=build /usr/src/app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

