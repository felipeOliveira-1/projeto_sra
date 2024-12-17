from openai import OpenAI
import os
from dotenv import load_dotenv
from pathlib import Path

# Carrega as variáveis de ambiente do arquivo .env
env_path = Path(__file__).parent.parent / '.env.test'  # Usando o arquivo de teste
print(f"Procurando arquivo .env em: {env_path}")

# Verifica se o arquivo existe
if not env_path.exists():
    raise FileNotFoundError(f"Arquivo .env não encontrado em: {env_path}")

# Lê o conteúdo do arquivo .env diretamente
with open(env_path, 'r') as f:
    env_content = f.read().strip()  # Remove espaços em branco
    print(f"Conteúdo do arquivo .env: {env_content}")
    # Extrai a chave diretamente do conteúdo
    api_key = env_content.split('=')[1].strip()

# Debug: verifica se a chave está sendo lida corretamente
if not api_key:
    raise ValueError("OPENAI_API_KEY não encontrada nas variáveis de ambiente")

print(f"API Key encontrada (primeiros 15 caracteres): {api_key[:15]}")

# Verifica se a chave começa com 'sk-'
if not api_key.startswith('sk-'):
    raise ValueError("API Key inválida: deve começar com 'sk-'")

try:
    # Inicializa o cliente OpenAI
    client = OpenAI(
        api_key=api_key
    )
except Exception as e:
    print(f"Erro ao inicializar o cliente OpenAI: {str(e)}")
    raise

def generate_optimized_content(goal_data):
    """
    Gera conteúdo otimizado usando a OpenAI API baseado nos dados da meta.
    """
    try:
        print(f"Tentando gerar conteúdo com a chave (primeiros 15 caracteres): {api_key[:15]}")
        
        # Cria o prompt para o modelo
        system_message = """
Você é um especialista em desenvolvimento pessoal, produtividade e aplicação do Sistema de Repetição e Automação (SRA). 
O SRA é uma metodologia baseada em repetição espaçada, usada para reforçar hábitos e atingir metas com eficiência. 

Princípios do SRA:
1. **Repetição Espaçada**: As ações devem ser revisadas e repetidas em intervalos crescentes de tempo (ex.: 1, 3, 7, 15 e 30 dias).
2. **Automação de Revisões**: O progresso é automatizado e organizado em um ciclo estruturado.
3. **Feedback Contínuo**: Cada repetição deve incluir reflexões para otimizar o aprendizado e ajuste de metas.

Seu objetivo é criar planos de ação detalhados e motivacionais, sempre aplicando os princípios do SRA para garantir a retenção e o progresso contínuo.
"""
        
        user_message = f"""
Com base na seguinte meta de desenvolvimento pessoal:
**Título:** {goal_data.get('title')}
**Descrição:** {goal_data.get('description')}

Gere um plano de ação detalhado que incorpore os princípios do Sistema SRA. O plano deve conter as seguintes seções:

1. **Visão Geral da Meta**: Uma breve descrição motivacional da meta.
2. **Passos Práticos e Específicos**: Liste ações claras e acionáveis para atingir a meta.
3. **Cronograma SRA**: Organize as ações em um cronograma de repetição espaçada com os seguintes intervalos: 1, 3, 7, 15 e 30 dias.  
   - Para cada dia, inclua a tarefa correspondente a ser revisada ou executada.
4. **Checklist Diária**: Um checklist prático que o usuário pode acompanhar.
5. **Pergunta Reflexiva**: Uma pergunta que o usuário deve responder em cada repetição para avaliar o progresso.
6. **Dicas de Implementação**: Forneça conselhos motivacionais e práticos para superar desafios.

Mantenha o tom motivacional, prático e claro, focando no uso consistente do SRA como base.
"""

        # Faz a chamada para a API
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": user_message}
            ],
            temperature=0.13,
            max_tokens=1500
        )

        # Extrai o conteúdo da resposta
        content = response.choices[0].message.content

        return {
            "content": content,
            "success": True
        }
    except Exception as e:
        print(f"Erro ao gerar conteúdo: {str(e)}")
        return {
            "content": None,
            "success": False,
            "error": str(e)
        }
