# ============================================================
# app.py — Servidor principal Flask da Docsprime
# ============================================================
# Para rodar:
#   pip install flask
#   python app.py
# Acesse: http://localhost:5000
# ============================================================

from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# ---- Dados simulados (em produção, viria de um banco de dados) ----

SERVICES = [
    {
        "icon": "📄",
        "title": "Gestão de Documentos",
        "desc": "Organize, armazene e recupere documentos com segurança. Nossa plataforma ECM garante conformidade e rastreabilidade em cada etapa do ciclo de vida documental."
    },
    {
        "icon": "☁️",
        "title": "Cloud Computing",
        "desc": "Infraestrutura escalável e segura na nuvem. Acesse seus dados de qualquer lugar, com disponibilidade 99,9% e backups automáticos diários."
    },
    {
        "icon": "⚙️",
        "title": "Automação de Processos",
        "desc": "Elimine tarefas manuais com fluxos BPM inteligentes. Reduza erros, ganhe velocidade e libere sua equipe para o que realmente importa."
    },
]

TESTIMONIALS = [
    {
        "name": "Carla Mendonça",
        "role": "Diretora de TI — Grupo Saúde Integra",
        "text": "A Docsprime transformou completamente nossa gestão documental. Reduzimos 70% do tempo gasto em buscas e eliminamos o papel em dois departamentos.",
        "initials": "CM"
    },
    {
        "name": "Roberto Alves",
        "role": "CFO — Construtora Alvorada",
        "text": "A automação de processos financeiros que implementaram conosco reduziu nosso ciclo de aprovação de 5 dias para menos de 4 horas. Resultado incrível.",
        "initials": "RA"
    },
    {
        "name": "Ana Figueiredo",
        "role": "Gerente de Operações — LogTech Brasil",
        "text": "Suporte excepcional e plataforma robusta. Migramos para o cloud deles sem nenhuma interrupção operacional. Recomendo com total confiança.",
        "initials": "AF"
    },
]

STATS = [
    {"number": 500, "label": "Clientes Ativos", "suffix": "+"},
    {"number": 12, "label": "Anos de Mercado", "suffix": ""},
    {"number": 98, "label": "NPS de Satisfação", "suffix": "%"},
    {"number": 10, "label": "Milhões de Docs Gerenciados", "suffix": "M+"},
]

TIMELINE = [
    {
        "year": "2012",
        "title": "Fundação",
        "desc": "A Docsprime nasce em São Paulo com a missão de digitalizar e simplificar a gestão de documentos para empresas brasileiras."
    },
    {
        "year": "2020",
        "title": "Evolução para ECM/BPM",
        "desc": "Expansão da plataforma para um ecossistema completo de ECM e BPM, atendendo empresas de médio e grande porte em todo o Brasil."
    },
]


# ---- Rotas ----

@app.route("/")
def index():
    """Página principal — renderiza o template com todos os dados."""
    return render_template(
        "index.html",
        services=SERVICES,
        testimonials=TESTIMONIALS,
        stats=STATS,
        timeline=TIMELINE,
    )


@app.route("/contato", methods=["POST"])
def contato():
    """Recebe o formulário de contato (AJAX) e retorna JSON."""
    data = request.get_json()
    nome  = data.get("nome", "").strip()
    email = data.get("email", "").strip()
    msg   = data.get("mensagem", "").strip()

    # Validação mínima
    if not nome or not email or not msg:
        return jsonify({"ok": False, "erro": "Preencha todos os campos."}), 400

    # Aqui você poderia enviar um e-mail, salvar no banco etc.
    print(f"[CONTATO] {nome} <{email}>: {msg}")

    return jsonify({"ok": True, "mensagem": "Mensagem recebida! Em breve entraremos em contato."})


# ---- Inicialização ----

if __name__ == "__main__":
    import os
    # Em produção (Railway), usa a PORT do ambiente. Localmente usa 5000.
    port = int(os.environ.get("PORT", 5000))
    debug = os.environ.get("FLASK_ENV") != "production"
    app.run(host="0.0.0.0", port=port, debug=debug)
