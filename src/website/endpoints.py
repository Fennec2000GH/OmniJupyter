
from flask import Flask, make_response, jsonify

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    """Home page"""
    


