# Use a lightweight Python image
FROM python:3.10-slim

# Set the working directory
WORKDIR /medical

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3-pip \
    && rm -rf /var/lib/apt/lists/* \
    || apt-get update --fix-missing && apt-get install -y python3-pip
RUN pip install --no-cache-dir --upgrade pip  
RUN pip install --no-cache-dir uvicorn fastapi  

# Copy the rest of the application
COPY . .

# Expose the API port
EXPOSE 8002

# Start Uvicorn server
CMD ["uvicorn", "medical:app", "--host", "0.0.0.0", "--port", "8002"]
