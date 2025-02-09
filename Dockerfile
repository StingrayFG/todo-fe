FROM node:20-alpine AS base


FROM base AS deps

WORKDIR /app
COPY package.json ./
RUN npm install --omit-dev


FROM base AS builder

RUN mkdir /app && chown node:node /app
WORKDIR /app
COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY . .
RUN npm run build


FROM base AS runner

WORKDIR /app
COPY --from=builder --chown=node:node /app/build ./build
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/src ./src
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/package.json ./package.json
COPY --from=builder --chown=node:node /app/jsconfig.json ./jsconfig.json
COPY --from=builder --chown=node:node /app/tailwind.config.js ./tailwind.config.js


USER node
ENV NODE_ENV=production
ENV REACT_APP_SERVER_URL=http://todo-be:4000
ENV PORT=3000
EXPOSE ${PORT}

CMD npm start