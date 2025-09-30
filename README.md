

# Game Stats - Rainbow Six Siege

Este projeto é uma aplicação web para visualizar estatísticas de operadores e armas do jogo Rainbow Six Siege. O backend é construído com Spring Boot e o frontend com uma moderna estrutura JavaScript.

## Pré-requisitos

Antes de começar, certifique-se de que você tem as seguintes ferramentas instaladas em sua máquina:

  * **Docker e Docker Compose:** Essencial para levantar o ambiente de banco de dados de forma conteinerizada.
  * **Java Development Kit (JDK) 17:** O projeto backend foi desenvolvido usando Java 17.
  * **Apache Maven:** Para compilar e executar o projeto Spring Boot. Certifique-se de que o Maven está configurado para usar o JDK 17.
  * **Node.js e npm:** Necessários para instalar as dependências e executar o projeto frontend.

## Como Executar a Aplicação

Siga os passos abaixo para colocar a aplicação em funcionamento.

### 1\. Clonar o Repositório

Primeiro, clone este repositório para a sua máquina local:


### 2\. Backend (Spring Boot)

As instruções a seguir irão configurar e iniciar o servidor backend e o banco de dados.

1.  **Navegue até a pasta do backend:**

    ```bash
    cd game-stats
    ```

2.  **Inicie o container do banco de dados com Docker Compose:**
    Este comando irá baixar a imagem do banco de dados, se necessário, e iniciará o container em modo "detached" (em segundo plano).

    ```bash
    docker-compose up -d
    ```

3.  **Execute a aplicação Spring Boot:**
    Certifique-se de que seu Maven está configurado para usar o JDK 17.

    ```bash
    mvn spring-boot:run
    ```

    O servidor backend estará rodando em `http://localhost:8080`.

### 3\. Frontend

Com o backend em execução, abra um novo terminal para configurar e iniciar a interface do usuário.

1.  **Navegue até a pasta do frontend:**
    (A partir da raiz do projeto)

    ```bash
    cd frontend
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**

    ```bash
    npm run dev
    ```

    A aplicação frontend estará acessível em seu navegador, geralmente em `http://localhost:3000` ou outra porta indicada no terminal.

## Funcionalidades

  * **Consultas de Dados:** Todas as consultas detalhadas sobre operadores e seus equipamentos podem ser encontradas nas páginas **Jogador** e **Arsenal**.
  * **Visualização Gráfica:** Para uma análise visual dos dados, visite a página **Dashboard**, onde diversos gráficos interativos estão disponíveis.
