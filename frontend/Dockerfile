FROM nginx:alpine

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the frontend files into the Nginx container
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80
# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

#docker run -d --name nginx-frontend --network todo-network -p 80:80 mariox1105/todo-frontend:1.0