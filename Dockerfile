# Start from the official Node.js image
FROM node:19.5.0-alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

ENV NEXT_TELEMETRY_DISABLED 1

# Set environment variable for DATABASE_URL
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# Copy pnpm's lock files and package.json for better caching of node modules
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of the application to the container
COPY . .

# Generate Prisma Client
RUN pnpm prisma generate

# Build the Next.js app
RUN pnpm run build

# Start the app
CMD [ "pnpm", "start" ]
