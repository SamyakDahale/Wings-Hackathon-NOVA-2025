# Use Node.js base image for building
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY ../package.json ../package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build Next.js app
RUN npm run build

# Use a minimal runtime environment
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app ./

# Expose the port Next.js runs on
EXPOSE 5173

# Start the Next.js app
CMD ["npm", "run", "start"]
