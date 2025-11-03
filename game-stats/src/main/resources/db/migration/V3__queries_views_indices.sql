/*

* ETAPA 04 - CONSULTAS AVANÇADAS, VISÕES E ÍNDICES

* Este arquivo contém todos os entregáveis da Etapa 04.

* Tema: Rainbow Six Siege 2025

*/



-- 1. SQL DOS ÍNDICES

-- Criação de 02 novos índices necessários para otimizar as consultas e visões abaixo.



/*

* Índice 1: `idx_participa_jogador_id`

* Justificativa: A tabela `participa` é a tabela de fatos central. Muitas consultas

* (como a `view_desempenho_geral_jogador`) irão filtrar ou agrupar dados por `jogador_id`.

* Indexar esta chave estrangeira é essencial para a performance.

*/

CREATE INDEX idx_participa_jogador_id ON participa(jogador_id);



/*

* Índice 2: `idx_participa_operador_id`

* Justificativa: Similar ao índice anterior, a performance de consultas

* que analisam o meta do jogo (como a `view_popularidade_operador`) depende

* de uma busca rápida por `operador_id` na tabela `participa`.

*/

CREATE INDEX idx_participa_operador_id ON participa(operador_id);





-- 2. SQL DAS CONSULTAS (04 NOVAS CONSULTAS)



/*

* Consulta 1 (Anti Join - RIGHT JOIN):

* Objetivo: Listar todos os operadores que NUNCA foram escolhidos em nenhuma partida registrada.

* Isso é útil para identificar operadores que precisam de um "rework" ou "buff" no R6 2025.

*/

SELECT o.nome AS operador_nunca_usado

FROM participa p

         RIGHT JOIN operador o ON p.operador_id = o.id

WHERE p.id IS NULL;





/*

* Consulta 2 (Full Outer Join):

* Objetivo: Mostrar uma lista completa de todos os jogadores e todos os times,

* e a relação entre eles.

* Isso mostrará:

* 1. Jogadores e os times pelos quais eles já jogaram.

* 2. Jogadores que estão no banco de dados mas nunca jogaram (ex: 'Newbie123' se não estiver em `participa`).

* 3. Times que estão registrados mas nunca tiveram um jogador em uma partida (ex: 'Vortex Gaming' se não estiver em `participa`).

*/

WITH JogadorTimeRelacao AS (

-- Primeiro, obtemos as combinações únicas de jogador-time da tabela de fatos

    SELECT DISTINCT jogador_id, time_id

    FROM participa

)

-- Parte 1: Pega todos os JOGADORES e seus times (inclui jogadores sem time)

SELECT

    j.nome AS jogador,

    t.nome AS time

FROM jogador j

    LEFT JOIN JogadorTimeRelacao jt ON j.id = jt.jogador_id

    LEFT JOIN time t ON jt.time_id = t.id



UNION



-- Parte 2: Pega todos os TIMES e seus jogadores (inclui times sem jogadores)

SELECT

    j.nome AS jogador,

    t.nome AS time

FROM jogador j

    RIGHT JOIN JogadorTimeRelacao jt ON j.id = jt.jogador_id

    RIGHT JOIN time t ON jt.time_id = t.id;





/*

* Consulta 3 (Subconsulta com Agregação):

* Objetivo: Encontrar o "MVP" (jogador com maior pontuação) da partida de ID = 1.

* A subconsulta encontra a pontuação máxima para a partida_id 1.

*/

SELECT

    j.nome AS mvp_partida_1,

    p.pontuacao

FROM participa p

         JOIN jogador j ON p.jogador_id = j.id

WHERE

    p.partida_id = 1

  AND p.pontuacao = (

    SELECT MAX(pontuacao)

    FROM participa

    WHERE partida_id = 1

);





/*

* Consulta 4 (Subconsulta com IN):

* Objetivo: Listar o nome de todos os jogadores que já jogaram pelo menos uma vez no mapa "Banco".

* Útil para ver quem tem experiência em um mapa específico.

*/

SELECT DISTINCT j.nome

FROM jogador j

WHERE j.id IN (

-- Subconsulta que retorna todos os IDs de jogadores que participaram de partidas no 'Banco'

    SELECT p.jogador_id

    FROM participa p

             JOIN partida pa ON p.partida_id = pa.id

             JOIN mapa m ON pa.mapa_id = m.id

    WHERE m.nome = 'Banco'

);





-- 3. SQL DAS VISÕES (02 NOVAS VISÕES)



/*

* Visão 1: `view_desempenho_geral_jogador`

* Justificativa Semântica: Para criar um "Perfil de Carreira" ou "Painel de Estatísticas"

* na aplicação, é fundamental ter uma visão consolidada que resuma todo o desempenho

* de um jogador. Esta visão calcula o K/D Ratio, totais de kills, assists, headshots

* e gadgets destruídos para cada jogador cadastrado.

* (Joins: jogador -> participa -> dados)

*/

CREATE VIEW view_desempenho_geral_jogador AS

SELECT

    j.nome AS jogador,

    j.patente,

    COALESCE(SUM(p.kills), 0) AS total_kills,

    COALESCE(SUM(p.deaths), 0) AS total_deaths,

    CASE

        WHEN COALESCE(SUM(p.deaths), 0) = 0 THEN CAST(COALESCE(SUM(p.kills), 0) AS DECIMAL(10, 2))

        ELSE ROUND(

                CAST(COALESCE(SUM(p.kills), 0) AS DECIMAL(10, 2)) / SUM(p.deaths),

                2)

        END AS kd_ratio,

    COALESCE(SUM(p.assists), 0) AS total_assists,

    COALESCE(SUM(d.headshots), 0) AS total_headshots,

    COALESCE(SUM(d.gadgets_destruidos), 0) AS total_gadgets_destruidos,

    COALESCE(COUNT(DISTINCT p.partida_id), 0) AS total_partidas_jogadas

FROM jogador j

         LEFT JOIN participa p ON j.id = p.jogador_id

         LEFT JOIN dados d ON p.id = d.participa_id

GROUP BY j.id, j.nome, j.patente

ORDER BY kd_ratio DESC;





/*

* Visão 2: `view_meta_popularidade_operador`

* Justificativa Semântica: Para a análise do "meta" do R6 2025, é crucial

* entender a popularidade (taxa de escolha) e a eficácia (taxa de vitória) de

* cada operador. Esta visão complexa agrupa os dados de todas as partidas para

* mostrar o tipo do operador (Ataque/Defesa), quantas vezes foi jogado,

* quantas dessas partidas resultaram em vitória e o seu "Win Rate" (percentual de vitórias).

* (Joins: operador -> ataque/defesa (para tipo) -> participa (para uso) -> partida (para resultado))

*/

CREATE VIEW view_meta_popularidade_operador AS

SELECT

    o.nome AS operador,

    o.velocidade,

    o.vida,

-- Determina o TIPO (Ataque/Defesa) fazendo join com as tabelas filhas

    CASE

        WHEN a.id IS NOT NULL THEN 'Ataque'

        WHEN d.id IS NOT NULL THEN 'Defesa'

        ELSE 'Desconhecido'

        END AS tipo,

-- Contagem de quantas vezes foi escolhido

    COALESCE(COUNT(p.id), 0) AS vezes_jogado,

-- Contagem de vitórias (quando o time do jogador é o time vencedor da partida)

    COALESCE(SUM(

                     CASE

                         WHEN p.time_id = pa.time_vencedor_id THEN 1

                         ELSE 0

                         END

             ), 0) AS vitorias,

-- Calcula o Win Rate em percentual, tratando divisão por zero

    CASE

        WHEN COALESCE(COUNT(p.id), 0) = 0 THEN 0.00

        ELSE ROUND(

                (COALESCE(SUM(CASE WHEN p.time_id = pa.time_vencedor_id THEN 1 ELSE 0 END), 0) * 100.0) / COUNT(p.id), 2

             )

        END AS win_rate_percent

FROM operador o

-- Joins para determinar o tipo

         LEFT JOIN ataque a ON o.id = a.id

         LEFT JOIN defesa d ON o.id = d.id

-- Joins para obter estatísticas de uso e vitória

         LEFT JOIN participa p ON o.id = p.operador_id

         LEFT JOIN partida pa ON p.partida_id = pa.id

GROUP BY o.id, o.nome, o.velocidade, o.vida, tipo

ORDER BY vezes_jogado DESC;