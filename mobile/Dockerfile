FROM node:20 as build

WORKDIR /app

RUN npm install -g eas-cli@latest

COPY package.json ./
RUN npm install

COPY . .

ARG EXPO_TOKEN
RUN if [ -n "$EXPO_TOKEN" ]; then \
    echo "Logging in to EAS..." && \
    eas login --non-interactive --token $EXPO_TOKEN && \
    echo "Creating EAS update..." && \
    eas update --auto --non-interactive --message "Docker build $(date +%Y-%m-%d_%H-%M-%S)" || \
    echo "EAS update failed" \
    ; fi


RUN npm run build:web

RUN npm run prepare:web

FROM nginx:alpine3.20-slim

COPY --from=build /app/serveDist/ /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
