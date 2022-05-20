FROM node:12.16.1 as builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist/SprintBet .
ENTRYPOINT ["nginx", "-g", "daemon off;"]