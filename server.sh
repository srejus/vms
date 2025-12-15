#!/bin/bash

BASE_DIR="/home/administrator/vms_project/vms"
VENV="/home/administrator/vms_project/venv/bin"
LOG_DIR="$BASE_DIR/logs"
mkdir -p "$LOG_DIR"

LOG_FILE="$LOG_DIR/vms.log"
SOCKET_PATH="$BASE_DIR/gunicorn.sock"

start_servers() {
  echo "Starting Gunicorn server for vms..."

  # Remove stale socket file if exists
  if [ -f "$SOCKET_PATH" ]; then
    rm "$SOCKET_PATH"
  fi

  $VENV/gunicorn \
    --workers 3 \
    --bind unix:$SOCKET_PATH \
    --log-level debug \
    --access-logfile "$LOG_FILE" \
    --error-logfile "$LOG_FILE" \
    --timeout 180 \
    vms.wsgi:application &

  echo "Server started."
}

stop_servers() {
  echo "Stopping Gunicorn..."
  pkill -f 'gunicorn.*vms'
  echo "All services stopped."
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