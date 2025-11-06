package com.game_stats.game_stats.api.repository;

import com.game_stats.game_stats.api.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class StatsRepository {

    private final NamedParameterJdbcTemplate jdbcTemplate;

    // --- ETAPA 06: Dashboard KPIs ---
    public KpiDTO getKpis() {
        String sql = """
            SELECT
                (SELECT COUNT(*) FROM Jogador) AS totalJogadores,
                (SELECT COUNT(*) FROM Partida) AS totalPartidas,
                (SELECT AVG(KD) FROM Dados) AS mediaKd,
                (SELECT AVG(Winrate) FROM Dados) AS mediaWinrate
        """;
        return jdbcTemplate.queryForObject(sql, new MapSqlParameterSource(), new BeanPropertyRowMapper<>(KpiDTO.class));
    }

    // --- ETAPA 06: Gráficos Dinâmicos ---
    public List<StatsAgrupadosDTO> getJogadoresPorRank() {
        String sql = "SELECT RankJogador AS chave, COUNT(*) AS contagem FROM Dados GROUP BY RankJogador ORDER BY contagem DESC";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(StatsAgrupadosDTO.class));
    }

    public List<StatsAgrupadosDTO> getJogadoresPorRole() {
        String sql = "SELECT Main_role AS chave, COUNT(*) AS contagem FROM Dados GROUP BY Main_role ORDER BY contagem DESC";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(StatsAgrupadosDTO.class));
    }

    public List<ScatterPlotDTO> getKdVsHeadshot() {
        String sql = "SELECT KD AS x, Headshot AS y FROM Dados WHERE KD IS NOT NULL AND Headshot IS NOT NULL";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(ScatterPlotDTO.class));
    }

    // --- ETAPA 04: Consultas Avançadas ---
    public List<ConsultaAntiJoinDTO> getConsultaAntiJoin() {
        String sql = """
            SELECT o.Nome AS operador_ataque_nao_usado
            FROM Operador o
                     JOIN Ataque a ON o.ID_Operador = a.fk_Operador_ID_Operador
                     LEFT JOIN Jogador_Op_Atk joa ON o.ID_Operador = joa.fk_Operador_Ataque_ID
            WHERE joa.fk_Jogador_ID_Jogador IS NULL;
        """;
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(ConsultaAntiJoinDTO.class));
    }

    public List<ConsultaFullJoinDTO> getConsultaFullJoin() {
        String sql = """
            SELECT j.Nickname AS Jogador, t.Nome AS Time
            FROM Jogador j
                LEFT JOIN Tem tm ON j.ID_Jogador = tm.fk_Jogador_ID_Jogador
                LEFT JOIN Time t ON tm.fk_Time_ID_Time = t.ID_Time
            UNION
            SELECT j.Nickname AS Jogador, t.Nome AS Time
            FROM Jogador j
                RIGHT JOIN Tem tm ON j.ID_Jogador = tm.fk_Jogador_ID_Jogador
                RIGHT JOIN Time t ON tm.fk_Time_ID_Time = t.ID_Time;
        """;
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(ConsultaFullJoinDTO.class));
    }

    public List<ConsultaSubMaxDTO> getConsultaSubMax() {
        String sql = """
            SELECT j.Nickname, d.KD
            FROM Jogador j
                     JOIN Dados d ON j.fk_Dados_Dados_PK_INT = d.Dados_PK_INT
            WHERE d.KD = (
                SELECT MAX(KD) FROM Dados
            );
        """;
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(ConsultaSubMaxDTO.class));
    }

    public List<ConsultaSubInDTO> getConsultaSubIn(String mapaNome) {
        String sql = """
            SELECT t.Nome
            FROM Time t
            WHERE t.ID_Time IN (
                SELECT p.fk_Time_ID_Time
                FROM Participa p
                         JOIN Partida pa ON p.fk_Partida_ID_Partida = pa.ID_Partida
                         JOIN Mapa m ON pa.fk_Mapa_ID_Mapa = m.ID_Mapa
                WHERE m.Nome = :mapaNome
            );
        """;
        return jdbcTemplate.query(sql, new MapSqlParameterSource("mapaNome", mapaNome), new BeanPropertyRowMapper<>(ConsultaSubInDTO.class));
    }


    // --- ETAPA 04: Views ---
    public List<ViewPerfilJogadorDTO> getViewPerfilJogador() {
        String sql = "SELECT * FROM view_perfil_jogador";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(ViewPerfilJogadorDTO.class));
    }

    public List<ViewMetaAtaqueDTO> getViewMetaAtaque() {
        String sql = "SELECT * FROM view_meta_operador_ataque";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(ViewMetaAtaqueDTO.class));
    }


    // --- ETAPA 05: Procedures e Triggers ---
    public void callRecalcularRanks() {
        String sql = "CALL sp_recalcular_ranks_por_kd()";
        jdbcTemplate.update(sql, new MapSqlParameterSource());
    }

    public List<RankLogDTO> getRankLogs() {
        String sql = "SELECT * FROM log_alteracoes_rank ORDER BY data_alteracao DESC";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(RankLogDTO.class));
    }
}