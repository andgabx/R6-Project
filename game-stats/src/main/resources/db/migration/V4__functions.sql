/*
 * ETAPA 04 - FUNÇÕES
 * Este arquivo contém todos os entregáveis da Etapa 04 referentes à criação de funções.
 * Tema: Rainbow Six Siege 2025
 */

-- 1. SQL DAS FUNÇÕES
-- Criação de 02 novas funções com justificativa semântica.


/*
 * Função 1: fn_calcular_kd_jogador(p_jogador_id INT)
 *
 * Justificativa Semântica: Esta função encapsula uma regra de negócio vital para
 * qualquer jogo de tiro: o cálculo do K/D Ratio (Kills/Deaths). Ao invés de
 * replicar essa lógica em múltiplas consultas ou na aplicação, a função
 * centraliza o cálculo.
 *
 * Ela busca o total de kills e deaths de um jogador específico na tabela 'participa'
 * e retorna o K/D. O uso de uma ESTRUTURA CONDICIONAL (IF/ELSE) é
 * essencial para tratar a divisão por zero (caso o jogador tenha 0 mortes),
 * garantindo que a consulta nunca falhe por esse motivo.
 */
CREATE OR REPLACE FUNCTION fn_calcular_kd_jogador(p_jogador_id INT)
RETURNS DECIMAL(10, 2) AS $$
DECLARE
    total_kills INT;
    total_deaths INT;
    kd_ratio DECIMAL(10, 2);
BEGIN
    -- 1. Obter totais da tabela 'participa'
    SELECT
        COALESCE(SUM(kills), 0),
        COALESCE(SUM(deaths), 0)
    INTO
        total_kills,
        total_deaths
    FROM participa
    WHERE jogador_id = p_jogador_id;

    -- 2. Estrutura Condicional para tratar divisão por zero
    IF total_deaths = 0 THEN
        -- Se o jogador tem 0 mortes, seu K/D é o número de kills
        kd_ratio := total_kills::DECIMAL(10, 2);
    ELSE
        -- Cálculo padrão do K/D
        kd_ratio := ROUND(total_kills::DECIMAL / total_deaths, 2);
    END IF;

    RETURN kd_ratio;
END;
$$ LANGUAGE plpgsql;


/*
 * Função 2: fn_classificar_patente(p_patente VARCHAR)
 *
 * Justificativa Semântica: O jogo possui muitas patentes (ex: Platina I, Platina II,
 * Platina III). Para relatórios gerenciais ou para exibir um perfil de jogador
 * de forma simplificada na interface, é útil agrupar essas patentes em
 * "categorias" maiores (ex: 'Alto Nível', 'Médio', 'Iniciante').
 *
 * Esta função utiliza uma ESTRUTURA CONDICIONAL (CASE) para mapear o texto
 * exato da patente (armazenado na tabela 'jogador') para uma classificação
 * padronizada, facilitando filtros e exibições agrupadas.
 */
CREATE OR REPLACE FUNCTION fn_classificar_patente(p_patente VARCHAR)
RETURNS VARCHAR(50) AS $$
BEGIN
    RETURN CASE
        WHEN p_patente = 'Campeão' THEN 'Elite'
        WHEN p_patente LIKE 'Diamante%' OR p_patente LIKE 'Platina%' THEN 'Alto Nível'
        WHEN p_patente LIKE 'Ouro%' THEN 'Médio'
        WHEN p_patente LIKE 'Prata%' THEN 'Regular'
        WHEN p_patente LIKE 'Bronze%' OR p_patente LIKE 'Cobre%' THEN 'Iniciante'
        ELSE 'Não Classificado'
    END;
END;
$$ LANGUAGE plpgsql;