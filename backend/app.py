from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from services.openai_service import generate_optimized_content
from services.sra_service import create_sra_schedule

# Carrega variáveis de ambiente
load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route('/api/generate_content', methods=['POST'])
def generate_content():
    try:
        data = request.get_json()
        if not data or 'title' not in data or 'description' not in data:
            return jsonify({"error": "Dados incompletos"}), 400
            
        result = generate_optimized_content(data)
        if not result['success']:
            return jsonify({"error": result['error']}), 500
            
        return jsonify({"content": result['content']}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/schedule_review', methods=['POST'])
def schedule_review():
    try:
        data = request.get_json()
        if not data or 'title' not in data:
            return jsonify({"error": "Dados incompletos"}), 400
            
        result = create_sra_schedule(data)
        if not result['success']:
            return jsonify({"error": result['error']}), 500
            
        return jsonify(result['schedule']), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
