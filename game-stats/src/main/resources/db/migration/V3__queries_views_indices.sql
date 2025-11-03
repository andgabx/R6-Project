/*
 * ETAPA 03 - CONSULTAS AVANÇADAS, VISÕES E ÍNDICES
 * (Corrigido para o V1__schema.sql baseado na avaliação do monitor)
 */

-- 1. SQL DOS ÍNDICES
/*
 * Índice 1: `idx_tem_jogador`
 * Justificativa: A tabela `Tem` (relação N:N Jogador-Time) será muito
 * consultada para saber o time de um jogador. Indexar a FK do jogador
 * acelera essa busca.
 */
CREATE INDEX idx_tem_jogador ON Tem(fk_Jogador_ID_Jogador);

/*
 * Índice 2: `idx_jogador_op_atk_op`
 * Justificativa: Para visões de "meta" (como a view_meta_ataque),
 * precisamos agrupar dados por operador. Indexar a FK do operador
 * na tabela de junção é essencial para a performance.
 */
CREATE INDEX idx_jogador_op_atk_op ON Jogador_Op_Atk(fk_Operador_Ataque_ID);


-- 2. SQL DAS CONSULTAS (04 NOVAS CONSULTAS)

/*
 * Consulta 1 (Anti Join - LEFT JOIN):
 * Objetivo: Listar todos os operadores de ataque que NUNCA foram
 * usados por NENHUM jogador (não possuem registro em Jogador_Op_Atk).
 */
SELECT o.Nome AS operador_ataque_nao_usado
FROM Operador o
         JOIN Ataque a ON o.ID_Operador = a.fk_Operador_ID_Operador -- Garante que é de ataque
         LEFT JOIN Jogador_Op_Atk joa ON o.ID_Operador = joa.fk_Operador_Ataque_ID
WHERE joa.fk_Jogador_ID_Jogador IS NULL;


/*
 * Consulta 2 (Full Outer Join - Emulado para MySQL):
 * Objetivo: Mostrar uma lista completa de todos os jogadores e todos os times,
 * e a relação entre eles (quem está em qual time).
 * Mostra jogadores sem time E times sem jogadores.
 */
SELECT
    j.Nickname AS Jogador,
    t.Nome AS Time
FROM Jogador j
    LEFT JOIN Tem tm ON j.ID_Jogador = tm.fk_Jogador_ID_Jogador
    LEFT JOIN Time t ON tm.fk_Time_ID_Time = t.ID_Time
UNION
SELECT
    j.Nickname AS Jogador,
    t.Nome AS Time
FROM Jogador j
    RIGHT JOIN Tem tm ON j.ID_Jogador = tm.fk_Jogador_ID_Jogador
    RIGHT JOIN Time t ON tm.fk_Time_ID_Time = t.ID_Time;


/*
 * Consulta 3 (Subconsulta com Agregação):
 * Objetivo: Encontrar o(s) jogador(es) com o maior K/D (Kill/Death ratio)
 * registrado na tabela de Dados.
 */
SELECT
    j.Nickname,
    d.KD
FROM Jogador j
         JOIN Dados d ON j.fk_Dados_Dados_PK_INT = d.Dados_PK_INT
WHERE d.KD = (
    SELECT MAX(KD) FROM Dados
);


/*
 * Consulta 4 (Subconsulta com IN):
 * Objetivo: Listar o nome de todos os times que já participaram
 * de alguma partida no mapa "Banco".
 */
SELECT t.Nome
FROM Time t
WHERE t.ID_Time IN (
    SELECT p.fk_Time_ID_Time
    FROM Participa p
             JOIN Partida pa ON p.fk_Partida_ID_Partida = pa.ID_Partida
             JOIN Mapa m ON pa.fk_Mapa_ID_Mapa = m.ID_Mapa
    WHERE m.Nome = 'Banco'
);


-- 3. SQL DAS VISÕES (02 NOVAS VISÕES)

/*
 * Visão 1: `view_perfil_jogador`
 * Justificativa Semântica: Para criar um "Perfil de Carreira" ou
 * "Painel de Estatísticas" na aplicação, é fundamental ter uma visão
 * consolidada que junte os dados de 'Jogador' e 'Dados', e também
 * traga os nomes dos mapas (de 'Mapa').
 * (Joins: Jogador -> Dados -> Mapa (x3))
 */
CREATE VIEW view_perfil_jogador AS
SELECT
    j.ID_Jogador,
    j.Nickname,
    d.Nivel,
    d.RankJogador,
    d.Winrate AS Winrate_Geral,
    d.KD,
    d.Horas_jogadas,
    d.Plataforma,
    m_fav.Nome AS Mapa_Favorito,
    m_vit.Nome AS Mapa_Mais_Vitorias,
    m_der.Nome AS Mapa_Mais_Derrotas
FROM Jogador j
         LEFT JOIN Dados d ON j.fk_Dados_Dados_PK_INT = d.Dados_PK_INT
         LEFT JOIN Mapa m_fav ON d.fk_Mapa_favorito = m_fav.ID_Mapa
         LEFT JOIN Mapa m_vit ON d.fk_Mapa_mais_vitorias = m_vit.ID_Mapa
         LEFT JOIN Mapa m_der ON d.fk_Mapa_mais_derrotas = m_der.ID_Mapa;


/*
 * Visão 2: `view_meta_operador_ataque`
 * Justificativa Semântica: Para a análise do "meta" do R6 2025,
 * é crucial entender a popularidade (quantos jogadores usam) e a
 * eficácia (Winrate médio) de cada operador de ATQUE.
 * (Joins: Operador -> Ataque -> Jogador_Op_Atk)
 */
CREATE VIEW view_meta_operador_ataque AS
SELECT
    o.Nome,
    o.Velocidade,
    o.Blindagem,
    o.Unidade_Especial,
    a.Gadget_Unico_Ataque,
    COUNT(joa.fk_Jogador_ID_Jogador) AS Total_Jogadores_Que_Usam,
    AVG(joa.Winrate) AS Winrate_Medio_Entre_Eles
FROM Operador o
         JOIN Ataque a ON o.ID_Operador = a.fk_Operador_ID_Operador
         LEFT JOIN Jogador_Op_Atk joa ON o.ID_Operador = joa.fk_Operador_Ataque_ID
GROUP BY o.ID_Operador, o.Nome, o.Velocidade, o.Blindagem, o.Unidade_Especial, a.Gadget_Unico_Ataque
ORDER BY Total_Jogadores_Que_Usam DESC;