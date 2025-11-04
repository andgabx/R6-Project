/*
 * ETAPA 04 - TRIGGERS (GATILHOS)
 * Este arquivo contém todos os entregáveis da Etapa 04 referentes à criação de triggers.
 * Tema: Rainbow Six Siege 2025
 */

-- 1. SQL DOS TRIGGERS
-- Criação de 02 novos triggers com justificativa semântica.

--
-- PRIMEIRO, precisamos criar a tabela de LOGS que será usada pelo Trigger 1.
--
CREATE TABLE IF NOT EXISTS log_alteracoes_patente (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    jogador_id INT,
    patente_antiga VARCHAR(255),
    patente_nova VARCHAR(255),
    data_alteracao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_log_jogador FOREIGN KEY (jogador_id) REFERENCES jogador(id) ON DELETE SET NULL
);


/*
 * Trigger 1: fn_trg_logar_mudanca_patente()
 *
 * Justificativa Semântica: Este é um trigger de auditoria (Log). No domínio
 * de um jogo competitivo, a patente (ranking) de um jogador é uma informação
 * crucial. Este trigger dispara AUTOMATICAMENTE APÓS (AFTER) qualquer
 * ATUALIZAÇÃO (UPDATE) na tabela 'jogador'.
 *
 * Sua função é verificar se a patente do jogador foi *realmente* alterada.
 * Se (IF) a nova patente for diferente da antiga, ele insere um registro
 * na tabela 'log_alteracoes_patente', guardando um histórico de quem
 * mudou, o que mudou (de/para) e quando mudou.
 */
CREATE OR REPLACE FUNCTION fn_trg_logar_mudanca_patente()
RETURNS TRIGGER AS $$
BEGIN
    -- Verifica se o campo 'patente' foi realmente alterado
    -- (NEW e OLD são variáveis especiais em triggers)
    IF NEW.patente IS DISTINCT FROM OLD.patente THEN
        -- Insere o registro na tabela de log
        INSERT INTO log_alteracoes_patente (jogador_id, patente_antiga, patente_nova, data_alteracao)
        VALUES (NEW.id, OLD.patente, NEW.patente, NOW());
    END IF;

    -- Retorna o registro modificado para que o UPDATE continue
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Associação do Trigger à tabela 'jogador'
CREATE TRIGGER trg_logar_mudanca_patente
AFTER UPDATE ON jogador
FOR EACH ROW
EXECUTE FUNCTION fn_trg_logar_mudanca_patente();


/*
 * Trigger 2: fn_trg_validar_stats_participa()
 *
 * Justificativa Semântica: Este é um trigger de validação e integridade de dados.
 * Ele dispara ANTES (BEFORE) de uma INSERÇÃO (INSERT) ou ATUALIZAÇÃO (UPDATE)
 * na tabela 'participa' (que registra o desempenho de um jogador em uma partida).
 *
 * A sua função é garantir uma regra de negócio básica do jogo: um jogador
 * não pode ter estatísticas negativas (ex: -2 kills). Se a aplicação
 * tentar inserir dados inválidos (kills ou deaths < 0), o trigger
 * irá interceptar a operação e LANÇAR UMA EXCEÇÃO (RAISE EXCEPTION),
 * cancelando a transação e impedindo que dados "lixo" entrem no banco.
 */
CREATE OR REPLACE FUNCTION fn_trg_validar_stats_participa()
RETURNS TRIGGER AS $$
BEGIN
    -- Verifica se kills ou deaths são negativos
    IF NEW.kills < 0 OR NEW.deaths < 0 THEN
        -- Lança um erro e cancela a operação
        RAISE EXCEPTION 'Estatísticas inválidas: Kills e Deaths não podem ser negativos. (Kills: %, Deaths: %)', NEW.kills, NEW.deaths;
    END IF;

    -- Se os dados são válidos, permite que a operação (INSERT/UPDATE) continue
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Associação do Trigger à tabela 'participa'
CREATE TRIGGER trg_validar_stats_participa
BEFORE INSERT OR UPDATE ON participa
FOR EACH ROW
EXECUTE FUNCTION fn_trg_validar_stats_participa();