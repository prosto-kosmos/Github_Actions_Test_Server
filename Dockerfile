FROM node:20-alpine as build
WORKDIR /opt/app
ADD package*.json ./
COPY prisma ./prisma/
RUN npm ci
ADD . .
RUN npm run build

FROM node:20-alpine
WORKDIR /opt/app
COPY --from=build /opt/app/dist ./dist
COPY --from=build /opt/app/prisma ./prisma
ADD package*.json ./
RUN npm ci --omit=dev
CMD ["node", "./dist/main.js"]
