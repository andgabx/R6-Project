package com.game_stats.game_stats.api.repository;

import com.game_stats.game_stats.api.model.Partida;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class PartidaRepository {

    private final NamedParameterJdbcTemplate jdbcTemplate;

    private static final BeanPropertyRowMapper<Partida> ROW_MAPPER =
            new BeanPropertyRowMapper<>(Partida.class);

    public List<Partida> findAll() {
        String sql = """
                SELECT
                    ID_Partida      AS idPartida,
                    Resultado       AS resultado,
                    fk_Mapa_ID_Mapa AS mapaId,
                    fk_Modo_de_Jogo_ID_Modo_de_Jogo AS modoDeJogoId,
                    DataHora        AS dataHora
                FROM Partida
                """;
        return jdbcTemplate.query(sql, ROW_MAPPER);
    }

    public Optional<Partida> findById(Integer id) {
        String sql = """
                SELECT
                    ID_Partida      AS idPartida,
                    Resultado       AS resultado,
                    fk_Mapa_ID_Mapa AS mapaId,
                    fk_Modo_de_Jogo_ID_Modo_de_Jogo AS modoDeJogoId,
                    DataHora        AS dataHora
                FROM Partida
                WHERE ID_Partida = :id
                """;
        return jdbcTemplate.query(sql,
                        new MapSqlParameterSource("id", id),
                        ROW_MAPPER)
                .stream()
                .findFirst();
    }

    public int save(Partida partida) {
        String sql = """
                INSERT INTO Partida
                    (Resultado, fk_Mapa_ID_Mapa, fk_Modo_de_Jogo_ID_Modo_de_Jogo, DataHora)
                VALUES
                    (:resultado, :mapaId, :modoDeJogoId, :dataHora)
                """;

        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("resultado", partida.getResultado())
                .addValue("mapaId", partida.getMapaId())
                .addValue("modoDeJogoId", partida.getModoDeJogoId())
                .addValue("dataHora", partida.getDataHora());

        return jdbcTemplate.update(sql, params);
    }

    public int update(Partida partida) {
        String sql = """
                UPDATE Partida
                   SET Resultado = :resultado,
                       fk_Mapa_ID_Mapa = :mapaId,
                       fk_Modo_de_Jogo_ID_Modo_de_Jogo = :modoDeJogoId,
                       DataHora = :dataHora
                 WHERE ID_Partida = :id
                """;

        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("id", partida.getIdPartida())
                .addValue("resultado", partida.getResultado())
                .addValue("mapaId", partida.getMapaId())
                .addValue("modoDeJogoId", partida.getModoDeJogoId())
                .addValue("dataHora", partida.getDataHora());

        return jdbcTemplate.update(sql, params);
    }

    public int delete(Integer id) {
        String sql = "DELETE FROM Partida WHERE ID_Partida = :id";
        return jdbcTemplate.update(sql, new MapSqlParameterSource("id", id));
    }
}