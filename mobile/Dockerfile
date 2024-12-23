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
ENV EXPO_TOKEN ${EXPO_TOKEN}

RUN if [ -n "$EXPO_TOKEN" ]; then \
    echo "Token provided, length: ${#EXPO_TOKEN}" && \
    echo "PATH: $PATH" && \
    echo "Node modules: $(ls -la node_modules/.bin)" && \
    echo "Logging in to EAS..." && \
    eas login --non-interactive --token "$EXPO_TOKEN" 2>&1 || exit 1 && \
    echo "Login successful, creating update..." && \
    eas update --auto --non-interactive --message "Docker build $(date +%Y-%m-%d_%H-%M-%S)" --json 2>&1 || { echo "EAS update failed with error: $?"; exit 1; } \
    ; else \
    echo "No EXPO_TOKEN provided"; \
    exit 1; \
    fi


RUN npm run build:web

RUN npm run prepare:web

FROM nginx:alpine3.20-slim

COPY --from=build /app/serveDist/ /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
