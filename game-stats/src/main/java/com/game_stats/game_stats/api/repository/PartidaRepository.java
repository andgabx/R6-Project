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

    public List<Partida> findAll() {
        String sql = """
            SELECT ID_Partida as idPartida,
                   Jogador_ID as jogadorId,
                   Operador_ID as operadorId,
                   Kills as kills,
                   Deaths as deaths,
                   Vitoria as vitoria,
                   DataPartida as dataPartida
            FROM Partida
        """;
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Partida.class));
    }

    public Optional<Partida> findById(Integer id) {
        String sql = """
            SELECT ID_Partida as idPartida,
                   Jogador_ID as jogadorId,
                   Operador_ID as operadorId,
                   Kills as kills,
                   Deaths as deaths,
                   Vitoria as vitoria,
                   DataPartida as dataPartida
            FROM Partida WHERE ID_Partida = :id
        """;
        return jdbcTemplate.query(sql,
                        new MapSqlParameterSource("id", id),
                        new BeanPropertyRowMapper<>(Partida.class))
                .stream().findFirst();
    }

    public int save(Partida partida) {
        String sql = """
            INSERT INTO Partida (Jogador_ID, Operador_ID, Kills, Deaths, Vitoria, DataPartida)
            VALUES (:jogadorId, :operadorId, :kills, :deaths, :vitoria, :dataPartida)
        """;
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("jogadorId", partida.getJogadorId())
                .addValue("operadorId", partida.getOperadorId())
                .addValue("kills", partida.getKills())
                .addValue("deaths", partida.getDeaths())
                .addValue("vitoria", partida.getVitoria())
                .addValue("dataPartida", partida.getDataPartida());
        return jdbcTemplate.update(sql, params);
    }

    public int update(Partida partida) {
        String sql = """
            UPDATE Partida
            SET Jogador_ID = :jogadorId,
                Operador_ID = :operadorId,
                Kills = :kills,
                Deaths = :deaths,
                Vitoria = :vitoria
            WHERE ID_Partida = :id
        """;
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("id", partida.getIdPartida())
                .addValue("jogadorId", partida.getJogadorId())
                .addValue("operadorId", partida.getOperadorId())
                .addValue("kills", partida.getKills())
                .addValue("deaths", partida.getDeaths())
                .addValue("vitoria", partida.getVitoria());
        return jdbcTemplate.update(sql, params);
    }

    public int delete(Integer id) {
        String sql = "DELETE FROM Partida WHERE ID_Partida = :id";
        return jdbcTemplate.update(sql, new MapSqlParameterSource("id", id));
    }
}