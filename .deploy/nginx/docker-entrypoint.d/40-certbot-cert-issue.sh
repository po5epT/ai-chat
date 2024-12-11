#!/bin/sh -e

ME=$(basename $0)

entrypoint_log() {
    if [ -z "${NGINX_ENTRYPOINT_QUIET_LOGS:-}" ]; then
        echo "$@"
    fi
}

entrypoint_log "${ME}: trying to obtain stagig cert for ${FRONTEND_DOMAIN_NAME}"
certbot certonly --dry-run --standalone --agree-tos -m dev@dev.com -n -d ${FRONTEND_DOMAIN_NAME}

entrypoint_log "${ME}: test cert obtained truing to obtain valid one"
certbot certonly --standalone --agree-tos -m dev@dev.com -n -d ${FRONTEND_DOMAIN_NAME}

LOG_PATH="/proc/1/fd/2"
RENEW_SCRIPT_PATH="/etc/periodic/weekly/cert-renew.sh"

entrypoint_log "${ME}: creating cron rule to automatically renew cert"
echo "#!/bin/sh" > $RENEW_SCRIPT_PATH
echo "certbot renew --nginx >> $LOG_PATH 2>&1" >> $RENEW_SCRIPT_PATH
chmod +x $RENEW_SCRIPT_PATH


entrypoint_log "${ME}: launch cron daemon"
crond -b -L $LOG_PATH

exit 0
