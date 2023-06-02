# Use the official Node.js image
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the desired port
EXPOSE 8080

# Start the application
CMD ["yarn", "run", "dev"]
