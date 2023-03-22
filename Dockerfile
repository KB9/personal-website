# =============================================================================
# Base Image
# =============================================================================
FROM node:18.15.0-alpine AS base

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine 
# to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./

# =============================================================================
# Dependencies
# =============================================================================
FROM base AS dependencies

RUN npm install --production
# Copy production node_modules aside
RUN cp -R node_modules prod_node_modules
# Install all node_modules, including devDependencies
RUN npm install

# =============================================================================
# Development
# =============================================================================
FROM dependencies AS development

CMD ["npm", "run", "dev"]

# =============================================================================
# Production
# =============================================================================
FROM base AS production

ENV NODE_ENV=production

COPY --from=dependencies /app/prod_node_modules ./node_modules
COPY . .
RUN npm run build
CMD ["npm", "start"]
