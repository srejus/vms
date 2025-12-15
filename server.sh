#!/bin/bash

BASE_DIR="/home/administrator/vms_project/vms"
VENV="/home/administrator/vms_project/venv/bin"
LOG_DIR="$BASE_DIR/logs"
mkdir -p "$LOG_DIR"

LOG_FILE="$LOG_DIR/vms.log"
PORT=9071

start_servers() {
    echo "Starting Gunicorn server for vms on port $PORT..."

    $VENV/gunicorn \
        --workers 3 \
        --bind 127.0.0.1:$PORT \
        --log-level debug \
        --access-logfile "$LOG_FILE" \
        --error-logfile "$LOG_FILE" \
        --timeout 180 \
        vms.wsgi:application &

    echo "Server started on port $PORT."
}

stop_servers() {
    echo "Stopping Gunicorn..."
    pkill -f 'gunicorn.*vms.wsgi'
    echo "Gunicorn stopped."
}

case "$1" in
    start)
        start_servers
        ;;
    stop)
        stop_servers
        ;;
    restart)
        stop_servers
        sleep 2
        start_servers
        ;;
    *)
        echo "Usage: $0 {start|stop|restart}"
        exit 1
        ;;
esac

exit 0
