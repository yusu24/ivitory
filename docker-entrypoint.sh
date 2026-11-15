#!/usr/bin/env bash
set -e

cd /var/www/html

# Configure Apache port from Render's PORT environment variable (default 10000)
PORT="${PORT:-10000}"
sed -i "s/Listen 80/Listen ${PORT}/g" /etc/apache2/ports.conf
sed -i "s/:80>/:${PORT}>/g" /etc/apache2/sites-available/000-default.conf

# Create .env from .env.example if not present
if [ ! -f .env ]; then
    cp .env.example .env
fi

# Generate APP_KEY if not set in environment or .env
if [ -z "${APP_KEY}" ]; then
    php artisan key:generate --force
fi

# Default to SQLite if DB_CONNECTION is sqlite or unset
DB_CONN="${DB_CONNECTION:-sqlite}"
if [ "${DB_CONN}" = "sqlite" ]; then
    mkdir -p database
    touch database/database.sqlite
    chown -R www-data:www-data database
fi

# Ensure storage & cache permissions
mkdir -p storage/app/public storage/framework/cache/data storage/framework/sessions storage/framework/views storage/logs bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

# Link public storage, run migrations and seed default data
php artisan storage:link --force || true
php artisan migrate --force
php artisan db:seed --force || true

# Re-apply ownership after artisan commands (which run as root) so Apache (www-data) can write to SQLite & storage
chown -R www-data:www-data database storage bootstrap/cache
chmod -R 775 database storage bootstrap/cache

exec apache2-foreground
