FROM node:22-alpine as base
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install

FROM base as development
COPY . .
EXPOSE 3000 5173 6006
# Default command (can be overridden in docker-compose)
CMD ["pnpm", "dev"]

FROM base as build
COPY . .
RUN rm -rf dist
CMD ["pnpm", "run", "build", "--mode", "preview"]

FROM base as preview
COPY . .
# Expose port for preview server
EXPOSE 4173
CMD ["pnpm", "run", "preview", "--host", "0.0.0.0"]

FROM base as deploy
COPY . .
# Runs wrangler to deploy to Cloudflare Pages
RUN pnpm wrangler --version
CMD ["pnpm", "run", "deploy"]