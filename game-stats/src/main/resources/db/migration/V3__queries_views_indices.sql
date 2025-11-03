CREATE INDEX idx_participa_jogador_id ON participa(jogador_id);
CREATE INDEX idx_participa_operador_id ON participa(operador_id);

SELECT o.nome AS operador_nunca_usado
FROM participa p
         RIGHT JOIN operador o ON p.operador_id = o.id
WHERE p.id IS NULL;

WITH JogadorTimeRelacao AS (
    SELECT DISTINCT jogador_id, time_id
    FROM participa
)
SELECT
    j.nome AS jogador,
    t.nome AS time
FROM jogador j
    LEFT JOIN JogadorTimeRelacao jt ON j.id = jt.jogador_id
    LEFT JOIN time t ON jt.time_id = t.id
UNION
SELECT
    j.nome AS jogador,
    t.nome AS time
FROM jogador j
    RIGHT JOIN JogadorTimeRelacao jt ON j.id = jt.jogador_id
    RIGHT JOIN time t ON jt.time_id = t.id;

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

SELECT DISTINCT j.nome
FROM jogador j
WHERE j.id IN (
    SELECT p.jogador_id
    FROM participa p
             JOIN partida pa ON p.partida_id = pa.id
             JOIN mapa m ON pa.mapa_id = m.id
    WHERE m.nome = 'Banco'
);

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

CREATE VIEW view_meta_popularidade_operador AS
SELECT
    o.nome AS operador,
    o.velocidade,
    o.vida,
    CASE
        WHEN a.id IS NOT NULL THEN 'Ataque'
        WHEN d.id IS NOT NULL THEN 'Defesa'
        ELSE 'Desconhecido'
        END AS tipo,
    COALESCE(COUNT(p.id), 0) AS vezes_jogado,
    COALESCE(SUM(
                     CASE
                         WHEN p.time_id = pa.time_vencedor_id THEN 1
                         ELSE 0
                         END
             ), 0) AS vitorias,
    CASE
        WHEN COALESCE(COUNT(p.id), 0) = 0 THEN 0.00
        ELSE ROUND(
                (COALESCE(SUM(CASE WHEN p.time_id = pa.time_vencedor_id THEN 1 ELSE 0 END), 0) * 100.0) / COUNT(p.id), 2
             )
        END AS win_rate_percent
FROM operador o
         LEFT JOIN ataque a ON o.id = a.id
         LEFT JOIN defesa d ON o.id = d.id
         LEFT JOIN participa p ON o.id = p.operador_id
         LEFT JOIN partida pa ON p.partida_id = pa.id
GROUP BY o.id, o.nome, o.velocidade, o.vida, tipo
ORDER BY vezes_jogado DESC;