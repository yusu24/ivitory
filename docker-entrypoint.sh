#!/usr/bin/env bash
set -e

cd /var/www/html

# Configure Apache port from Render's PORT environment variable (default 10000)
PORT="${PORT:-10000}"
sed -i "s/Listen 80/Listen ${PORT}/g" /etc/apache2/ports.conf
sed -i "s/:80>/:${PORT}>/g" /etc/apache2/sites-available/000-default.conf

exec apache2-foreground
