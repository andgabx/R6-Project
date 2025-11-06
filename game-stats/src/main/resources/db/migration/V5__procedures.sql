/*
 * ETAPA 05 - PROCEDIMENTOS (Corrigido para MySQL e Schema V1)
 */

/*
 * Procedimento 1: sp_atualizar_rank_jogador (Atualização de Dados)
 *
 * Justificativa Semântica: Centraliza a regra de negócio para atualizar o
 * rank de um jogador. A aplicação chama este procedimento ao invés de
 * um UPDATE direto.
 */
DROP PROCEDURE IF EXISTS sp_atualizar_rank_jogador;
CREATE PROCEDURE sp_atualizar_rank_jogador(
    IN p_jogador_id INT,
    IN p_novo_rank VARCHAR(20)
)
MODIFIES SQL DATA
BEGIN
    UPDATE Dados d
    JOIN Jogador j ON d.Dados_PK_INT = j.fk_Dados_Dados_PK_INT
    SET d.RankJogador = p_novo_rank
    WHERE j.ID_Jogador = p_jogador_id;
END;


/*
 * Procedimento 2: sp_recalcular_ranks_por_kd (Uso de CURSOR)
 *
 * Justificativa Semântica: Simula uma rotina de fim de temporada que
 * recalcula o rank de todos os jogadores com base no K/D.
 *
 * Por que um CURSOR é necessário?
 * O procedimento precisa iterar (CURSOR) por cada jogador, aplicar
 * uma lógica condicional (CASE) para definir o novo rank, e então
 * chamar o *outro* procedimento (sp_atualizar_rank_jogador)
 * linha por linha. Um UPDATE simples não permitiria essa orquestração.
 */
DROP PROCEDURE IF EXISTS sp_recalcular_ranks_por_kd;
CREATE PROCEDURE sp_recalcular_ranks_por_kd()
MODIFIES SQL DATA
BEGIN
    -- Variáveis para o cursor
    DECLARE v_jogador_id INT;
    DECLARE v_kd DECIMAL(5,2);
    DECLARE v_novo_rank VARCHAR(20);
    DECLARE done INT DEFAULT FALSE;

    -- 1. Declaração do CURSOR
    DECLARE cur_jogadores CURSOR FOR
        SELECT j.ID_Jogador, d.KD
        FROM Jogador j
        JOIN Dados d ON j.fk_Dados_Dados_PK_INT = d.Dados_PK_INT;

    -- Handler para o fim do cursor
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    -- 2. Abrir o CURSOR
    OPEN cur_jogadores;

    read_loop: LOOP
        -- 3. Obter a próxima linha
        FETCH cur_jogadores INTO v_jogador_id, v_kd;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- 4. Aplicar lógica condicional
        CASE
            WHEN v_kd >= 2.0 THEN SET v_novo_rank = 'Campeão';
            WHEN v_kd >= 1.5 THEN SET v_novo_rank = 'Diamante I';
            WHEN v_kd >= 1.3 THEN SET v_novo_rank = 'Platina II';
            WHEN v_kd >= 1.1 THEN SET v_novo_rank = 'Ouro I';
            WHEN v_kd >= 1.0 THEN SET v_novo_rank = 'Prata III';
            WHEN v_kd >= 0.8 THEN SET v_novo_rank = 'Bronze II';
            ELSE SET v_novo_rank = 'Cobre V';
        END CASE;

        -- 5. Chamar o procedimento de atualização
        CALL sp_atualizar_rank_jogador(v_jogador_id, v_novo_rank);

    END LOOP;

    -- 6. Fechar o CURSOR
    CLOSE cur_jogadores;
END;