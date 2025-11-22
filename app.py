from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)
import os
API_KEY = os.getenv("API_KEY")
URL = "https://api.groq.com/openai/v1/chat/completions"

TEMA_DO_SITE = """
Você é a Atena.AI — um assistente focado em ajudar pessoas com:
- Problemas do dia a dia
- Contas, cálculos, medidas, distâncias
- Dúvidas sobre equipamentos simples como mouse, bateria, carregamento, RGB
- Explicações rápidas e diretas sobre coisas comuns

IMPORTANTE:
- Não fale sobre medicina profunda, política, religião, etc.
- Seja simples, direto e simpático.
"""

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    pergunta = data.get("pergunta", "")

    payload = {
        "model": "llama-3.1-8b-instant",
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

    if "error" in resposta:
        return jsonify({"resposta": "⚠️ Erro na API do servidor: " + resposta["error"]["message"]})

    if "choices" not in resposta:
        return jsonify({"resposta": "⚠️ A API não retornou 'choices'. Resposta inesperada."})

    texto = resposta["choices"][0]["message"]["content"]

    return jsonify({"resposta": texto})


import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)

