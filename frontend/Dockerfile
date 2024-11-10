# Use Nginx base image
FROM nginx:alpine

# Copy static files into Nginx's web directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]