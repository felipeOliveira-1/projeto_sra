from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import requests
from services.openai_service import generate_optimized_content
from services.sra_service import create_sra_schedule

# Carrega variáveis de ambiente
load_dotenv()

app = Flask(__name__)
# Configure CORS to allow requests from our React frontend
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization", "Accept"]
    }
})

@app.route('/api/realtime/session', methods=['POST', 'OPTIONS'])
def create_realtime_session():
    if request.method == 'OPTIONS':
        # Handle preflight request
        response = jsonify({'status': 'ok'})
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept')
        return response

    try:
        app.logger.info("Received request for realtime session")
        openai_api_key = os.getenv('OPENAI_API_KEY')
        if not openai_api_key:
            app.logger.error("OpenAI API key not configured")
            return jsonify({"error": "OpenAI API key not configured"}), 500

        app.logger.info("Making request to OpenAI API")
        
        # Load SRA content
        sra_content = ""
        try:
            with open('docs/Sistema Reticular Ativador (SRA).md', 'r', encoding='utf-8') as file:
                sra_content = file.read()
        except Exception as e:
            app.logger.error(f"Error loading SRA content: {str(e)}")
            
        response = requests.post(
            "https://api.openai.com/v1/realtime/sessions",
            headers={
                "Authorization": f"Bearer {openai_api_key}",
                "Content-Type": "application/json"
            },
            json={
                "model": "gpt-4o-realtime-preview-2024-12-17",
                "voice": "verse",
                "context": {
                    "role": "system",
                    "content": f"""Você é um assistente especializado no Sistema Reticular Ativador (SRA).
                    Use o seguinte conteúdo como base para suas respostas:
                    
                    {sra_content}
                    
                    Responda às perguntas de forma natural e conversacional, usando exemplos práticos
                    e mantendo o foco nas aplicações práticas do SRA para desenvolvimento pessoal e educação."""
                }
            }
        )
        
        if not response.ok:
            error_data = response.json() if response.content else {"message": "Unknown error"}
            app.logger.error(f"OpenAI API error: {error_data}")
            return jsonify({
                "error": f"Failed to create realtime session: {error_data.get('message', 'Unknown error')}"
            }), response.status_code
            
        session_data = response.json()
        app.logger.info("Successfully created realtime session")
        return jsonify({
            "success": True,
            "session": session_data
        })
    except Exception as e:
        app.logger.error(f"Error creating realtime session: {str(e)}")
        return jsonify({"error": str(e)}), 500

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
        app.logger.error(f"Error generating content: {str(e)}")
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
        app.logger.error(f"Error scheduling review: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
