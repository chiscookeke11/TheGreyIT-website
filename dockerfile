# Use official Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose a port (e.g., 3000)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
