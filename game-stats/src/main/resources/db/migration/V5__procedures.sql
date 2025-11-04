/*
 * ETAPA 04 - PROCEDIMENTOS (STORED PROCEDURES)
 * Este arquivo contém todos os entregáveis da Etapa 04 referentes à criação de procedimentos.
 * Tema: Rainbow Six Siege 2025
 */

-- 1. SQL DOS PROCEDIMENTOS
-- Criação de 02 novos procedimentos (um de atualização e um com cursor).


/*
 * Procedimento 1: sp_atualizar_patente_jogador (Atualização de Dados)
 *
 * Justificativa Semântica: Centraliza a regra de negócio para atualizar a patente
 * (ranking) de um jogador. Em um sistema real, isso pode envolver lógicas
 * complexas (cálculo de ELO, etc.), mas aqui serve como um "setter" seguro.
 * A aplicação, ao invés de rodar um UPDATE direto, chamaria este procedimento,
 * garantindo que apenas o campo 'patente' seja modificado de forma controlada.
 *
 * Exemplo de uso:
 * CALL sp_atualizar_patente_jogador(1, 'Campeão'); -- Define o jogador 'AceKiller' como Campeão
 */
CREATE OR REPLACE PROCEDURE sp_atualizar_patente_jogador(
    p_jogador_id INT,
    p_nova_patente VARCHAR(255)
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE jogador
    SET patente = p_nova_patente
    WHERE id = p_jogador_id;

    -- Em um cenário real, poderíamos adicionar um registro em uma tabela de LOG
    -- INSERT INTO log_alteracoes (descricao, data) VALUES ('Patente do jogador ' || p_jogador_id || ' atualizada para ' || p_nova_patente, NOW());
END;
$$;


/*
 * Procedimento 2: sp_recalcular_patentes_por_desempenho (Uso de CURSOR)
 *
 * Justificativa Semântica: Este procedimento simula uma rotina complexa de
 * "Recalibração de Patentes" que normalmente roda no final de uma temporada.
 *
 * Por que um CURSOR é necessário?
 * Um UPDATE simples (ex: UPDATE...FROM) não seria adequado aqui. Este
 * procedimento precisa executar um processamento complexo e sequencial
 * linha a linha (jogador por jogador) para:
 *
 * 1. Chamar a função `fn_calcular_kd_jogador` (criada na etapa anterior)
 * para CADA jogador individualmente.
 * 2. Aplicar uma lógica condicional (IF/ELSIF) baseada no K/D retornado.
 * 3. Chamar o *outro* procedimento (`sp_atualizar_patente_jogador`) para
 * aplicar a mudança específica daquele jogador.
 *
 * Essa orquestração de múltiplas chamadas (Função -> Lógica -> Procedimento)
 * para cada linha é um caso de uso clássico que justifica um CURSOR.
 *
 * Exemplo de uso:
 * CALL sp_recalcular_patentes_por_desempenho(); -- Atualiza todas as patentes
 */
CREATE OR REPLACE PROCEDURE sp_recalcular_patentes_por_desempenho()
LANGUAGE plpgsql
AS $$
DECLARE
    -- Variáveis para armazenar os dados do loop
    v_jogador_id INT;
    v_kd_ratio DECIMAL(10, 2);
    v_nova_patente VARCHAR(255);
    v_partidas_jogadas INT;

    -- 1. Declaração do CURSOR para iterar sobre todos os jogadores
    cur_jogadores CURSOR FOR
        SELECT j.id, COALESCE(COUNT(p.id), 0)
        FROM jogador j
        LEFT JOIN participa p ON j.id = p.jogador_id
        GROUP BY j.id;

BEGIN
    -- 2. Abrir o CURSOR
    OPEN cur_jogadores;

    -- 3. Iniciar o LOOP
    LOOP
        -- 4. Obter o próximo jogador e sua contagem de partidas
        FETCH cur_jogadores INTO v_jogador_id, v_partidas_jogadas;
        -- Sair do loop se não houver mais jogadores
        EXIT WHEN NOT FOUND;

        -- Regra de negócio: Só recalcula se tiver jogado pelo menos 1 partida
        IF v_partidas_jogadas > 0 THEN

            -- Etapa A: Chamar a função para calcular o K/D
            v_kd_ratio := fn_calcular_kd_jogador(v_jogador_id);

            -- Etapa B: Aplicar lógica de negócio condicional
            IF v_kd_ratio >= 3.0 THEN
                v_nova_patente := 'Diamante';
            ELSIF v_kd_ratio >= 2.0 THEN
                v_nova_patente := 'Platina I';
            ELSIF v_kd_ratio >= 1.5 THEN
                v_nova_patente := 'Ouro II';
            ELSIF v_kd_ratio >= 1.0 THEN
                v_nova_patente := 'Prata I';
            ELSIF v_kd_ratio >= 0.7 THEN
                v_nova_patente := 'Bronze III';
            ELSE
                v_nova_patente := 'Cobre V';
            END IF;

            -- Etapa C: Chamar o procedimento de atualização
            CALL sp_atualizar_patente_jogador(v_jogador_id, v_nova_patente);
        
        -- (ELSE: Se não jogou partidas, mantém a patente atual)

        END IF;
    END LOOP;

    -- 5. Fechar o CURSOR
    CLOSE cur_jogadores;
END;
$$;