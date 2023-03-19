from flask import Flask
#from mapleHacks import *
 
app = Flask(__name__)

@app.route('/creategraph/', methods=['GET', 'POST']) #We use the route() decorator to tell Flask what URL should trigger the function.
def big_data():
        
    # calling functions
    graphStateData()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)