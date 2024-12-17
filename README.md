# Projeto SRA (Sistema de Repetição e Automação)

## Estrutura do Projeto
```
projeto_sra/
├── backend/           # API Flask e lógica de negócios
├── frontend/          # Aplicação React
└── docs/             # Documentação do projeto
```

## Configuração do Ambiente

### Backend (Python/Flask)
1. Entre no diretório backend:
```bash
cd backend
```

2. Crie um ambiente virtual:
```bash
python -m venv venv
```

3. Ative o ambiente virtual:
- Windows:
```bash
venv\Scripts\activate
```

4. Instale as dependências:
```bash
pip install -r requirements.txt
```

5. Configure as variáveis de ambiente:
- Copie o arquivo `.env.example` para `.env`
- Adicione suas chaves de API no arquivo `.env`

6. Execute o servidor:
```bash
python app.py
```

### Frontend (React)
1. Entre no diretório frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm start
```
