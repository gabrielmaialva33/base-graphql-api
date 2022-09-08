FROM library/postgres
COPY ./init.sql /docker-entrypoint-initdb.d/

# Build runtime container
FROM node:lts-alpine
# Set environment variables
ENV NODE_ENV=development
# Set home dir
WORKDIR /home/node
# Copy over package.json files
COPY package*.json ./
# Copy yarn.lock file
COPY yarn.lock ./
# Absence of Python library.
# RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
# Install all packages
RUN yarn
# Copy over source code
COPY . .
# Build TypeScript for production
RUN yarn build
# Expose port to outside world
EXPOSE 4000


