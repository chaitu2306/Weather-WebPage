# Start from Ubuntu
FROM ubuntu:22.04

# Install Apache
RUN apt update && apt install -y apache2

# Copy your site files to Apache's web root
COPY ./weather-page/ /var/www/html/

# Expose port 80
EXPOSE 80

# Start Apache in the foreground
CMD ["apachectl", "-D", "FOREGROUND"]
