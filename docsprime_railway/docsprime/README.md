# Docsprime — Site Institucional com Flask

Site institucional moderno para a empresa Docsprime, construído com Python/Flask.

## Estrutura do projeto

```
docsprime/
├── app.py                  ← Servidor Flask (rotas e dados)
├── requirements.txt        ← Dependências Python
├── templates/
│   └── index.html          ← Template principal (Jinja2)
└── static/
    ├── css/
    │   └── style.css       ← Todos os estilos
    └── js/
        └── main.js         ← JavaScript (navbar, animações, formulário)
```

## Como rodar

```bash
# 1. Instale as dependências
pip install -r requirements.txt

# 2. Inicie o servidor
python app.py

# 3. Acesse no navegador
http://localhost:5000
```

## Seções do site

1. **Hero** — Título, subtítulo e CTA principal
2. **Sobre** — Missão, Visão e Valores em cards
3. **Linha do tempo** — 2012 (fundação) e 2020 (ECM/BPM)
4. **Serviços** — Gestão documental, Cloud e Automação
5. **Números** — Contadores animados
6. **Depoimentos** — Cards de clientes simulados
7. **Contato** — Formulário com envio AJAX

## Personalização

- **Dados e textos**: edite as listas no topo de `app.py`
- **Cores**: altere as variáveis CSS em `:root {}` no `style.css`
- **Logo**: substitua o bloco `.logo-placeholder` no `index.html`
