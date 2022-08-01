FROM python:3.9-slim-buster
WORKDIR /app
COPY requirements.txt requirements.txt
RUN python3 -m pip install --upgrade pip setuptools wheel
RUN python3 -m pip install requests Flask Flask-Cors
RUN pip3 install -r requirements.txt
RUN apt-get update
RUN apt-get install ffmpeg libsm6 libxext6  -y
COPY . .
CMD ["python3", "api.py"]