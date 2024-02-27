from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/data')
def get_data():
    return 'Welcome to the Flask Server!'

if __name__ == '__main__':
    app.run(debug=True)
