/*
 * ETAPA 05 - TRIGGERS (Corrigido para MySQL e Schema V1)
 */

-- 1. Tabela de LOG (Necessária para o Trigger 1)
CREATE TABLE IF NOT EXISTS log_alteracoes_rank (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    dados_id INT,
    rank_antigo VARCHAR(20),
    rank_novo VARCHAR(20),
    data_alteracao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_log_dados FOREIGN KEY (dados_id) REFERENCES Dados(Dados_PK_INT) ON DELETE SET NULL
);


/*
 * Trigger 1: trg_logar_mudanca_rank (Atualiza tabela de logs)
 *
 * Justificativa Semântica: Auditoria. Rastreia todas as alterações
 * de rank (patente) na tabela 'Dados'. Dispara após (AFTER)
 * um UPDATE e verifica se o 'RankJogador' mudou.
 */
DROP TRIGGER IF EXISTS trg_logar_mudanca_rank;
CREATE TRIGGER trg_logar_mudanca_rank
AFTER UPDATE ON Dados
FOR EACH ROW
BEGIN
    IF NEW.RankJogador <> OLD.RankJogador THEN
        INSERT INTO log_alteracoes_rank (dados_id, rank_antigo, rank_novo, data_alteracao)
        VALUES (NEW.Dados_PK_INT, OLD.RankJogador, NEW.RankJogador, NOW());
    END IF;
END;


/*
 * Trigger 2: trg_validar_stats_dados
 *
 * Justificativa Semântica: Integridade de Dados. Garante que estatísticas
 * vitais (KD, Winrate, Headshot) nunca sejam inseridas com valores
 * negativos, disparando ANTES (BEFORE) de um INSERT ou UPDATE.
 */
DROP TRIGGER IF EXISTS trg_validar_stats_dados;
CREATE TRIGGER trg_validar_stats_dados
BEFORE INSERT ON Dados
FOR EACH ROW
BEGIN
    IF NEW.KD < 0 OR NEW.Winrate < 0 OR NEW.Headshot < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Estatísticas (KD, Winrate, Headshot) não podem ser negativas.';
    END IF;
END;