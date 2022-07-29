FROM --platform=linux/amd64 python:slim
WORKDIR /app
COPY requirements.txt requirements.txt
RUN python3 -m pip install --upgrade pip setuptools wheel
# RUN pip3 install --upgrade pip setuptools wheel
# RUN pip3 install "numpy==1.21.5" --no-binary :all:
# RUN pip3 install --upgrade setuptools
RUN pip3 install -r requirements.txt
EXPOSE 8000
COPY . .
CMD ["python3", "api.py"]