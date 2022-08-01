from requests import request
import torch
from PIL import Image
from flask import Flask, request
from flask_cors import CORS, cross_origin
from io import BytesIO
import base64
import re


def inference(image_data):
    # Model
    model = torch.hub.load('ultralytics/yolov5', 'yolov5s')
    model.classes = [0]

    # Inference
    img = re.sub('^data:image/.+;base64,', '', image_data)
    im = Image.open(BytesIO(base64.b64decode(img)))
    results = model(im)
    return results.pandas().xyxy[0].to_json()


app = Flask(__name__)
cors = CORS(app)


@app.route('/', methods=['POST'])
def index():
    result = inference(request.form['img'])
    return result, 200


@ app.route('/api', methods=['POST'])
def scindex():
    result = inference(request.form['img'])
    return result, 200


if __name__ == '__main__':
    app.run(port='8000', debug=True, host='0.0.0.0')
