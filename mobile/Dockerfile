FROM node:20 AS build

WORKDIR /app

RUN node --version && npm --version

RUN npm install -g eas-cli@latest && \
    npm install -g expo-cli && \
    echo "EAS path: $(which eas)" && \
    echo "EAS version: $(eas --version)"

COPY package.json ./
RUN npm install

COPY . .

ARG EXPO_TOKEN
ENV EXPO_TOKEN=${EXPO_TOKEN}

RUN if [ -n "$EXPO_TOKEN" ]; then \
    echo "Token found (length: ${#EXPO_TOKEN})" && \
    echo "Running EAS update..." && \
    EXPO_TOKEN=$EXPO_TOKEN eas update --auto --message "Docker build $(date +%Y-%m-%d_%H-%M-%S)" --json 2>&1 || { \
    echo "EAS update failed with error: $?" && \
    exit 1; \
    } \
    ; else \
    echo "No EXPO_TOKEN provided in environment" && \
    exit 1; \
    fi


RUN npm run build:web

RUN npm run prepare:web

FROM nginx:alpine3.20-slim

COPY --from=build /app/serveDist/ /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
