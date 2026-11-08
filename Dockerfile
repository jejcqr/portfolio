FROM nginxinc/nginx-unprivileged:alpine

COPY nginx/security-headers.inc /etc/nginx/security-headers.inc
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY site/ /usr/share/nginx/html/

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s CMD wget -q --spider http://127.0.0.1:8080/ || exit 1
