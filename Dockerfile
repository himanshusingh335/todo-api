# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install required packages
RUN pip install flask sqlite3

# Expose the port the app runs on
EXPOSE 5000

# Run the app
CMD ["python", "app.py"]