FROM nginx:alpine

RUN apk add --no-cache certbot certbot-nginx

COPY --chown=root:root --chmod=700 docker-entrypoint.d/* /docker-entrypoint.d/

COPY --chown=root:root templates/* /etc/nginx/templates/
