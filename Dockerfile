FROM node:20-alpine

# Install pnpm version 9 (matching your package.json requirement)
RUN corepack enable && corepack prepare pnpm@10 --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies (removed --frozen-lockfile)
RUN pnpm install

# Copy application code
COPY . .

# Build the application
RUN pnpm build

# Expose port (change if your app uses a different port)
EXPOSE 3000

# Start command
CMD ["pnpm", "start"]
