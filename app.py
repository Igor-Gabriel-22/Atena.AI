from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

API_KEY = os.getenv("API_KEY")
URL = "https://api.groq.com/openai/v1/chat/completions"

TEMA_DO_SITE = """
Você é a Atena.AI — um assistente focado em ajudar pessoas com:
- Problemas do dia a dia
- Contas, cálculos, medidas
- Dúvidas sobre mouse, RGB, bateria
- Explicações rápidas e simples
"""

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    pergunta = data.get("pergunta", "")

    payload = {
        "model": "llama-3.3-70b-versatile",
        "messages": [
            {"role": "system", "content": TEMA_DO_SITE},
            {"role": "user", "content": pergunta},
        ]
    }

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    resposta = requests.post(URL, json=payload, headers=headers).json()

    # Debug: ver no Render o que veio
    print("RESPOSTA DA API:", resposta)

    # Caso tenha erro
    if "error" in resposta:
        return jsonify({"resposta": "⚠️ Erro da IA: " + resposta["error"]["message"]})

    # Caso falte 'choices'
    if "choices" not in resposta:
        return jsonify({"resposta": "⚠️ A IA não respondeu corretamente."})

    texto = resposta["choices"][0]["message"]["content"]
    return jsonify({"resposta": texto})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
