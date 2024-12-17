# Projeto SRA (Sistema de Repetição e Automação)

## Sobre o Projeto
O SRA é um sistema inovador desenvolvido para automatizar tarefas repetitivas e otimizar fluxos de trabalho. Ele combina uma interface moderna e intuitiva com um backend robusto para oferecer:

- **Automação de Tarefas**: Crie e gerencie sequências de ações automatizadas
- **Agendamento**: Programe execuções de tarefas em horários específicos
- **Monitoramento**: Acompanhe o status e resultados das automações em tempo real
- **Relatórios**: Gere relatórios detalhados sobre as execuções e desempenho

## Tecnologias Utilizadas

### Backend
- **Python 3.8+**: Linguagem principal do backend
- **Flask**: Framework web para API REST
- **SQLAlchemy**: ORM para gerenciamento do banco de dados
- **Celery**: Processamento assíncrono de tarefas
- **Redis**: Cache e broker de mensagens

### Frontend
- **React 18**: Biblioteca JavaScript para construção da interface
- **TypeScript**: Superset JavaScript para maior segurança e produtividade
- **Material-UI**: Framework de componentes para interface moderna
- **Redux Toolkit**: Gerenciamento de estado da aplicação
- **Axios**: Cliente HTTP para comunicação com o backend

## Estrutura do Projeto
```
projeto_sra/
├── backend/           # API Flask e lógica de negócios
├── frontend/         # Aplicação React
└── docs/            # Documentação do projeto
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

## Requisitos do Sistema
- Python 3.8 ou superior
- Node.js 16.x ou superior
- Redis Server
- PostgreSQL 13+

## Contribuição
Contribuições são bem-vindas! Por favor, leia nosso guia de contribuição antes de submeter pull requests.

## Licença
Este projeto está licenciado sob a MIT License - veja o arquivo LICENSE para detalhes.
