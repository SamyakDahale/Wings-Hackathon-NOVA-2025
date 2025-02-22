FROM python:3.10-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3-pip \
    && rm -rf /var/lib/apt/lists/* \
    || apt-get update --fix-missing && apt-get install -y python3-pip
RUN pip install --no-cache-dir --upgrade pip  
RUN pip install --no-cache-dir uvicorn fastapi  
RUN pip install pytesseract
RUN apt-get update && apt-get install -y python3-pip tesseract-ocr  


COPY . .  

EXPOSE 8001

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8001"]
