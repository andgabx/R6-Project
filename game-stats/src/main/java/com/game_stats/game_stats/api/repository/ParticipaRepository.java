package com.game_stats.game_stats.api.repository;

import com.game_stats.game_stats.api.model.Participa;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class ParticipaRepository {

    private final NamedParameterJdbcTemplate jdbcTemplate;

    private static final BeanPropertyRowMapper<Participa> ROW_MAPPER =
            new BeanPropertyRowMapper<>(Participa.class);

    public List<Participa> findAll() {
        String sql = """
                SELECT fk_Partida_ID_Partida AS partidaId,
                       fk_Time_ID_Time      AS timeId
                  FROM Participa
                """;
        return jdbcTemplate.query(sql, ROW_MAPPER);
    }

    public Optional<Participa> findByIds(Integer partidaId, Integer timeId) {
        String sql = """
                SELECT fk_Partida_ID_Partida AS partidaId,
                       fk_Time_ID_Time      AS timeId
                  FROM Participa
                 WHERE fk_Partida_ID_Partida = :partidaId
                   AND fk_Time_ID_Time      = :timeId
                """;

        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("partidaId", partidaId)
                .addValue("timeId", timeId);

        return jdbcTemplate.query(sql, params, ROW_MAPPER)
                .stream()
                .findFirst();
    }

    public int save(Participa participa) {
        String sql = """
                INSERT INTO Participa (fk_Partida_ID_Partida, fk_Time_ID_Time)
                VALUES (:partidaId, :timeId)
                """;

        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("partidaId", participa.getPartidaId())
                .addValue("timeId", participa.getTimeId());

        return jdbcTemplate.update(sql, params);
    }

    public int delete(Integer partidaId, Integer timeId) {
        String sql = """
                DELETE FROM Participa
                 WHERE fk_Partida_ID_Partida = :partidaId
                   AND fk_Time_ID_Time      = :timeId
                """;

        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("partidaId", partidaId)
                .addValue("timeId", timeId);

        return jdbcTemplate.update(sql, params);
    }
}