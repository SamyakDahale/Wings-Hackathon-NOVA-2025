# Use official lightweight Python image
FROM python:3.10-slim

# Set working directory
WORKDIR /app1

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3-pip \
    && rm -rf /var/lib/apt/lists/* \
    || apt-get update --fix-missing && apt-get install -y python3-pip
RUN pip install --no-cache-dir --upgrade pip  
RUN pip install --no-cache-dir uvicorn fastapi  

# Copy the rest of the application
COPY . .

# Expose the API port
EXPOSE 8000

# Start Uvicorn server (Fixed --reload typo)
CMD ["uvicorn", "app1:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]
