from flask import Flask, jsonify, render_template
from flask_cors import CORS
from mapleHacks import createFourYearDf, graphParticipant, predictModel
import io
import base64
 
app = Flask(__name__)
CORS(app)


@app.route('/graph/', methods=['GET', 'POST']) #We use the route() decorator to tell Flask what URL should trigger the function.
def get_graph():

    # calling graph function from ethan
    graphStateData()

    # read the PNG file and convert it to a base64-encoded string
    with open('graph.png', 'rb') as f:
        encoded_str = base64.b64encode(f.read()).decode('utf-8')

    # return the encoded string as JSON to webpage
    return jsonify({'graph': encoded_string})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)