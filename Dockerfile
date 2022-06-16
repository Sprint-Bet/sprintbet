FROM node:12.16.1 as build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM nginx:1.19.7-alpine
COPY .nginx/etc-conf.d /etc/nginx/conf.d
COPY --from=build /app/dist/SprintBet/. /usr/share/nginx/html
ENTRYPOINT ["nginx", "-g", "daemon off;"]