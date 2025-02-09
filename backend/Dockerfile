# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install required packages
RUN pip install flask flask_cors
RUN apt-get update && apt-get install -y sqlite3
# Expose the port the app runs on
EXPOSE 5000

# Run the app
CMD ["python", "app.py"]

# NOTE: to create container: docker run -d -p 8000:5000 --name backend -v todo-data:/app/db/ --network todo-network mariox1105/todo-backend:1.0