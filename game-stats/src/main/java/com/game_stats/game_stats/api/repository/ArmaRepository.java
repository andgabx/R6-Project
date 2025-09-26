package com.game_stats.game_stats.api.repository;

import com.game_stats.game_stats.api.model.Arma;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class ArmaRepository {

    private final NamedParameterJdbcTemplate jdbcTemplate;

    public List<Arma> findAll() {
        String sql = """
            SELECT ID_Arma as idArma, Nome as nome, Tipo as tipo, Dano as dano
            FROM Arma
        """;
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Arma.class));
    }

    public Optional<Arma> findById(Integer id) {
        String sql = """
            SELECT ID_Arma as idArma, Nome as nome, Tipo as tipo, Dano as dano
            FROM Arma WHERE ID_Arma = :id
        """;
        return jdbcTemplate.query(sql,
                        new MapSqlParameterSource("id", id),
                        new BeanPropertyRowMapper<>(Arma.class))
                .stream().findFirst();
    }

    public int save(Arma arma) {
        String sql = """
            INSERT INTO Arma (Nome, Tipo, Dano)
            VALUES (:nome, :tipo, :dano)
        """;
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("nome", arma.getNome())
                .addValue("tipo", arma.getTipo())
                .addValue("dano", arma.getDano());
        return jdbcTemplate.update(sql, params);
    }

    public int update(Arma arma) {
        String sql = """
            UPDATE Arma
            SET Nome = :nome, Tipo = :tipo, Dano = :dano
            WHERE ID_Arma = :id
        """;
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("id", arma.getIdArma())
                .addValue("nome", arma.getNome())
                .addValue("tipo", arma.getTipo())
                .addValue("dano", arma.getDano());
        return jdbcTemplate.update(sql, params);
    }

    public int delete(Integer id) {
        String sql = "DELETE FROM Arma WHERE ID_Arma = :id";
        return jdbcTemplate.update(sql, new MapSqlParameterSource("id", id));
    }
}