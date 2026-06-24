FROM node:20-alpine

WORKDIR /app

# Copy package files first to cache dependency installations
COPY package*.json ./

RUN npm ci --only=production

# Copy application source code
COPY app/ ./app/

EXPOSE 8080

CMD ["npm", "start"]