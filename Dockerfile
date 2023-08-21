# Start from the official Node.js image
FROM node:19.5.0-alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

ENV NEXT_TELEMETRY_DISABLED 1

# Copy pnpm's lock files for better caching of node modules
COPY pnpm-lock.yaml ./

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