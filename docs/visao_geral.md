# **Projeto SRA - Aplicação com Integração de Inteligência Artificial**

## **Visão Geral**
O **Projeto SRA** (Sistema de Repetição e Automação) é uma aplicação robusta que organiza, personaliza e automatiza metas e orientações com foco em **desenvolvimento pessoal**. A solução utiliza **repetição espaçada** para maximizar a retenção e progresso, integrando **Inteligência Artificial** (OpenAI API) para geração de conteúdo otimizado e motivacional.

---

## **Objetivo**
Construir uma aplicação eficiente, moderna e visualmente atrativa que:  
- Organize metas, orientações e tarefas através do Sistema SRA.  
- Automatize o **ciclo de repetição** e revisão.  
- Utilize **OpenAI** para gerar conteúdo otimizado, motivacional e personalizado.  

---

## **Tecnologias Utilizadas**

### **Backend**
- **Python**: Linguagem principal para lógica de negócio.  
- **Flask**: Framework web leve e eficiente para o backend.  
- **OpenAI API**: Geração de conteúdo dinâmico e otimizado com GPT.  

### **Frontend**
- **React**: Framework para construção de interfaces modernas e dinâmicas.  
- **JavaScript**: Linguagem principal para interatividade no frontend.  
- **CSS**: Estilização responsiva e visualmente atrativa.  

---

## **Arquitetura do Projeto**

### **1. Backend (Flask + OpenAI API)**
- **Flask API**:  
  - Recebe entradas do frontend.  
  - Processa os dados e organiza cronogramas.  
  - Chama a **OpenAI API** para gerar textos personalizados.  
  - Envia os dados processados de volta ao frontend no formato JSON.

- **Endpoints:**  
  - `/generate_content`: Geração de textos e sugestões via OpenAI.  
  - `/schedule_review`: Cálculo e organização das datas de repetição espaçada.  

### **2. Frontend (React)**
- **Interface Dinâmica:**  
  - Formulário para inserir metas, tarefas ou orientações.  
  - Visualização dos textos gerados pela IA em tempo real.  
  - Exibição do cronograma de revisões com datas e progressão (SRA).  

- **Componentes Principais:**  
  - **Formulário de Entrada:** Inserção dos dados pelo usuário.  
  - **Área de Conteúdo:** Visualização dos textos otimizados gerados pela OpenAI.  
  - **Calendário/Schedule:** Exibição visual do cronograma de revisões.  

- **Interatividade:**  
  - Atualização em tempo real de textos e cronogramas.  
  - Botões para exportar conteúdos como PDF ou compartilhar.  

---

## **Funcionalidades**

1. **Cadastro de Metas e Orientações:**  
   - Usuário insere grupos de metas e tarefas no frontend.

2. **Geração de Conteúdo Inteligente:**  
   - A **OpenAI API** otimiza as descrições em textos claros, motivacionais e práticos.

3. **Cronograma SRA Automatizado:**  
   - Backend organiza o conteúdo em datas de revisão: **1, 3, 7, 15 e 30 dias**.

4. **Visualização e Exportação:**  
   - Usuário visualiza o cronograma e textos otimizados.  
   - Possibilidade de exportar como **PDF** ou outros formatos.

---

## **Fluxo de Funcionamento**

1. **Usuário Interage com o Frontend (React):**  
   - Insere informações básicas (ex.: metas e orientações).  

2. **Frontend Envia Dados ao Backend (Flask):**  
   - Os dados são enviados ao Flask via requisições HTTP.

3. **Backend Processa com API da OpenAI:**  
   - Chama a **OpenAI API** para gerar textos personalizados.  
   - Organiza as datas de repetição espaçada (SRA).

4. **Resposta ao Frontend:**  
   - Backend envia os textos e cronograma como resposta JSON.

5. **Frontend Renderiza os Dados:**  
   - Exibe o cronograma, textos e permite exportação em PDF.

---

## **Exemplo Prático**

### **Entrada:**
- **Título:** "Desenvolver hábito de leitura"  
- **Descrição:** "Quero ler 20 minutos por dia."

### **Saída Gerada pela IA:**
**Título:** Desenvolver Hábito de Leitura  
**Conteúdo:**  
"Estabeleça um hábito diário de leitura com os seguintes passos:  
1. **Defina um horário fixo:** Leia 20 minutos pela manhã ou à noite.  
2. **Escolha um livro inspirador:** Selecione algo que te motive a manter a constância.  
3. **Prepare o ambiente:** Um local calmo, organizado e livre de distrações.  
4. **Pergunta reflexiva:** Que aprendizados de hoje posso aplicar na minha vida?  
5. **Checklist:**  
   - ☐ Li 20 minutos hoje  
   - ☐ Tomei nota dos pontos importantes  
   - ☐ Refleti sobre o aprendizado do dia."

---

## **Saída Esperada**
- Interface visual amigável que permite:  
  - Inserir metas e orientações.  
  - Visualizar textos motivacionais e cronogramas gerados pela IA.  
  - Acompanhar revisões do SRA.  
  - Exportar os conteúdos como PDFs para fixação visual no quadro.

---

## **Próximos Passos**
1. **Desenvolver o Backend:**  
   - Criar endpoints do Flask para interação com a OpenAI API.

2. **Construir o Frontend:**  
   - Criar os componentes React e integrá-los ao backend.

3. **Testes e Validações:**  
   - Testar a geração e apresentação do conteúdo.

4. **Lançamento da Primeira Versão:**  
   - Implementar o MVP com geração de cronograma e conteúdos via OpenAI.

---

## **Conclusão**
O **Projeto SRA com Inteligência Artificial** oferece uma solução prática, moderna e eficiente para organizar metas e orientações. Através da **repetição espaçada** e integração com a **OpenAI API**, o sistema automatiza o processo de geração de conteúdo, motivação e revisão, facilitando o desenvolvimento pessoal.

Com uma interface intuitiva e uma estrutura robusta, a aplicação ajuda o usuário a organizar suas metas, manter o foco e acompanhar o progresso de maneira clara e objetiva.


