# Base image
FROM node:alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies for building
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

RUN pnpm install

# Copy project files
COPY . .

# Build the Next.js app
RUN pnpm run build

# Production image
FROM node:alpine AS runner

# Set working directory
WORKDIR /app

# Copy build output from the builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/public ./public
COPY --from=builder /app/app ./app
COPY --from=builder /app/components ./components
COPY --from=builder /app/types ./types
COPY --from=builder /app/middleware.ts ./middleware.ts
COPY --from=builder /app/next.config.mjs ./next.config.mjs


# Set environment variable for production
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Start the Next.js app
CMD ["yarn", "start"]
