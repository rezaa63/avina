FROM node:22-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY server.js ./server.js
COPY index.html manus-routes.json ./
COPY assets ./assets

EXPOSE 3000
CMD ["node", "server.js"]
