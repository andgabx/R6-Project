package com.game_stats.game_stats.api.repository;

import com.game_stats.game_stats.api.model.Time;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class TimeRepository {

    private final NamedParameterJdbcTemplate jdbcTemplate;

    private static final BeanPropertyRowMapper<Time> ROW_MAPPER =
            new BeanPropertyRowMapper<>(Time.class);

    public List<Time> findAll() {
        String sql = """
                SELECT
                    ID_Time        AS idTime,
                    fk_Partida_ID_Partida AS partidaId
                FROM Time
                """;
        return jdbcTemplate.query(sql, ROW_MAPPER);
    }

    public Optional<Time> findById(Integer id) {
        String sql = """
                SELECT
                    ID_Time        AS idTime,
                    fk_Partida_ID_Partida AS partidaId
                FROM Time
                WHERE ID_Time = :id
                """;
        return jdbcTemplate.query(sql,
                        new MapSqlParameterSource("id", id),
                        ROW_MAPPER)
                .stream()
                .findFirst();
    }

    public int save(Time time) {
        String sql = """
                INSERT INTO Time (fk_Partida_ID_Partida)
                VALUES (:partidaId)
                """;
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("partidaId", time.getPartidaId());
        return jdbcTemplate.update(sql, params);
    }

    public int update(Time time) {
        String sql = """
                UPDATE Time
                   SET fk_Partida_ID_Partida = :partidaId
                 WHERE ID_Time = :id
                """;
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("id", time.getIdTime())
                .addValue("partidaId", time.getPartidaId());
        return jdbcTemplate.update(sql, params);
    }

    public int delete(Integer id) {
        String sql = "DELETE FROM Time WHERE ID_Time = :id";
        return jdbcTemplate.update(sql, new MapSqlParameterSource("id", id));
    }

    // =====================================
    // Operações auxiliares na tabela Tem
    // =====================================

    public List<Integer> findJogadoresByTimeId(Integer timeId) {
        String sql = """
                SELECT fk_Jogador_ID_Jogador
                  FROM Tem
                 WHERE fk_Time_ID_Time = :timeId
                """;
        return jdbcTemplate.queryForList(sql,
                new MapSqlParameterSource("timeId", timeId),
                Integer.class);
    }

    public void addJogador(Integer timeId, Integer jogadorId) {
        String sql = """
                INSERT INTO Tem (fk_Time_ID_Time, fk_Jogador_ID_Jogador)
                VALUES (:timeId, :jogadorId)
                """;
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("timeId", timeId)
                .addValue("jogadorId", jogadorId);
        jdbcTemplate.update(sql, params);
    }

    public void removeJogador(Integer timeId, Integer jogadorId) {
        String sql = """
                DELETE FROM Tem
                 WHERE fk_Time_ID_Time = :timeId
                   AND fk_Jogador_ID_Jogador = :jogadorId
                """;
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("timeId", timeId)
                .addValue("jogadorId", jogadorId);
        jdbcTemplate.update(sql, params);
    }

    public void clearJogadores(Integer timeId) {
        String sql = """
                DELETE FROM Tem
                 WHERE fk_Time_ID_Time = :timeId
                """;
        jdbcTemplate.update(sql, new MapSqlParameterSource("timeId", timeId));
    }
}