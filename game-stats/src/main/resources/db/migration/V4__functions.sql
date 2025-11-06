/*
 * ETAPA 05 - FUNÇÕES (Corrigido para MySQL e Schema V1)
 * Tema: Rainbow Six Siege 2025
 */

/*
 * Função 1: fn_get_jogador_kd(p_jogador_id INT)
 *
 * Justificativa Semântica: Encapsula a lógica de buscar o K/D de um jogador.
 * Embora o K/D já esteja na tabela 'Dados', uma função permite que
 * procedimentos ou views complexas acessem esse valor de forma
 * abstrata, sem precisar repetir o JOIN (Jogador -> Dados).
 */
DROP FUNCTION IF EXISTS fn_get_jogador_kd;
CREATE FUNCTION fn_get_jogador_kd(p_jogador_id INT)
RETURNS DECIMAL(5,2)
DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE v_kd DECIMAL(5,2);

    SELECT d.KD INTO v_kd
    FROM Dados d
    JOIN Jogador j ON d.Dados_PK_INT = j.fk_Dados_Dados_PK_INT
    WHERE j.ID_Jogador = p_jogador_id;

    RETURN COALESCE(v_kd, 0.0);
END;

/*
 * Função 2: fn_classificar_rank(p_rank VARCHAR(20))
 *
 * Justificativa Semântica: Agrupa os ranks (ex: Platina I, Platina II)
 * em categorias maiores (Alto Nível, Médio, etc.) para relatórios
 * simplificados no dashboard.
 *
 * Utiliza ESTRUTURA CONDICIONAL (CASE) conforme exigido.
 */
DROP FUNCTION IF EXISTS fn_classificar_rank;
CREATE FUNCTION fn_classificar_rank(p_rank VARCHAR(20))
RETURNS VARCHAR(50)
DETERMINISTIC
BEGIN
    RETURN CASE
        WHEN p_rank = 'Campeão' THEN 'Elite'
        WHEN p_rank LIKE 'Diamante%' OR p_rank LIKE 'Platina%' THEN 'Alto Nível'
        WHEN p_rank LIKE 'Ouro%' THEN 'Médio'
        WHEN p_rank LIKE 'Prata%' THEN 'Regular'
        WHEN p_rank LIKE 'Bronze%' OR p_rank LIKE 'Cobre%' THEN 'Iniciante'
        ELSE 'Não Classificado'
    END;
END;