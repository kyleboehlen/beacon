FROM node:22-alpine

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy source code
COPY . .

# Expose ports for different services
EXPOSE 3000 5173 6006

# Default command (can be overridden in docker-compose)
CMD ["pnpm", "dev"]