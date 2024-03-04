from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

@app.route('/fetch-data', methods=['POST'])
def fetch_data():
    data = request.get_json()
    url = data.get('url')

    # Process the URL as needed
    # For now, let's just return the received URL in a response
    response_data = {
        'url': url,
        'message': 'URL received.'
    }

    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
