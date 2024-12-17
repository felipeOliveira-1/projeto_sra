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
Você é um especialista em desenvolvimento pessoal e produtividade, com profundo conhecimento no Sistema Reticular Ativador (SRA).
O SRA é um sistema no cérebro responsável por filtrar estímulos e focar no que é percebido como importante. Ele pode ser treinado e utilizado para maximizar a atenção, o foco e o alcance de metas, ignorando distrações.

Princípios Fundamentais do SRA que você deve aplicar:
1. **Clareza de Metas e Visualização**: Definir e visualizar metas detalhadamente como já realizadas.
2. **Afirmações Positivas e Intencionais**: Reprogramar o cérebro através de afirmações repetidas.
3. **Filtragem de Distrações**: Criar um ambiente focado e eliminar estímulos irrelevantes.
4. **Perguntas Poderosas**: Usar autoquestionamento para guiar ações e foco diário.
5. **Repetição Espacial e Temporal**: Reforçar aprendizados e metas por meio de revisões espaçadas.

Sua tarefa é criar planos de ação motivacionais, práticos e claros que integrem os princípios do SRA. Cada plano deve ser estruturado de maneira a treinar o SRA do usuário para focar no que realmente importa.
"""
        
        user_message = f"""
Com base na seguinte meta de desenvolvimento pessoal:
**Título:** {goal_data.get('title')}
**Descrição:** {goal_data.get('description')}

Gere um plano de ação detalhado aplicando os princípios do Sistema Reticular Ativador (SRA). O plano deve conter as seguintes seções:

1. **Visão Geral da Meta**: Explique a importância da meta e seu impacto positivo na vida do usuário.
2. **Clareza e Visualização da Meta**: Descreva como o usuário pode visualizar a meta diariamente, com detalhes e estímulos positivos.
3. **Afirmações Positivas**: Crie de 2 a 3 afirmações curtas e motivadoras que o usuário deve repetir todos os dias.
4. **Ações Práticas**: Liste passos claros e específicos que o usuário deve realizar diariamente ou semanalmente.
5. **Filtragem de Distrações**: Sugira práticas para eliminar distrações e criar um ambiente focado.
6. **Perguntas Poderosas**: Inclua 2 perguntas diárias que o usuário deve se fazer para manter o foco.
7. **Revisão Espaçada**: Proponha um cronograma de revisões (dias 1, 3, 7, 15, 30) para reforçar o progresso e fixação da meta.

Mantenha o tom motivacional, prático e inspirador, garantindo que os princípios do SRA estejam presentes em cada etapa do plano.
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
