FROM node:20-alpine

# Install pnpm using corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy application code
COPY . .

# Build the application
RUN pnpm build

# Expose port (change if your app uses a different port)
EXPOSE 3000

# Start command
CMD ["pnpm", "start"]
