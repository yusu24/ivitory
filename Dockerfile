# Stage 1: Build React + Vite Frontend
FROM node:22-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Stage 2: Laravel 12 + PHP 8.3 Apache Backend
FROM php:8.3-apache

# Install system dependencies & PHP extensions required by Laravel & Intervention Image
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libzip-dev \
    libsqlite3-dev \
    libpq-dev \
    libonig-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        pdo_mysql \
        pdo_pgsql \
        pdo_sqlite \
        gd \
        zip \
        bcmath \
        mbstring \
        exif \
    && a2enmod rewrite headers \
    && echo "ServerName localhost" >> /etc/apache2/apache2.conf \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set Apache DocumentRoot to /var/www/html/public
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf \
    && sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf \
    && sed -i '/<Directory \/var\/www\/>/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf

WORKDIR /var/www/html

# Copy backend composer files and install dependencies
COPY backend/composer.json backend/composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist

# Copy backend application source
COPY backend/ ./
RUN composer dump-autoload --optimize --no-dev

# Copy built frontend assets into Laravel public directory
COPY --from=frontend-builder /app/frontend/dist/ ./public/
RUN if [ -f ./public/index.html ]; then mv ./public/index.html ./public/spa.html; fi

# Pre-build SQLite database, run migrations & seeders, and set permissions at build time
# so container startup on Render's 0.1 CPU Free tier is instantaneous (<1s)
RUN cp .env.example .env \
    && php artisan key:generate --force \
    && mkdir -p database storage/app/public storage/framework/cache/data storage/framework/sessions storage/framework/views storage/logs bootstrap/cache \
    && touch database/database.sqlite \
    && php artisan storage:link --force \
    && DB_CONNECTION=sqlite php artisan migrate --force \
    && DB_CONNECTION=sqlite php artisan db:seed --force \
    && chown -R www-data:www-data /var/www/html/database /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/database /var/www/html/storage /var/www/html/bootstrap/cache

# Copy entrypoint script and normalize line endings
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN sed -i 's/\r$//' /usr/local/bin/docker-entrypoint.sh \
    && chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 10000

ENTRYPOINT ["docker-entrypoint.sh"]
