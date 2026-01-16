# Build stage
FROM node:lts-alpine AS build
WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Use standalone tsconfig for Docker build (no monorepo dependencies)
RUN cp tsconfig.docker.json tsconfig.json

# Build static site
ENV DOCKER_BUILD=true
RUN npm run build

# Production stage - use nginx for static files
FROM nginx:alpine AS runtime

# Copy built static files to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4321
CMD ["nginx", "-g", "daemon off;"]