package com.game_stats.game_stats.api.repository;

import com.game_stats.game_stats.api.model.Jogador;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class JogadorRepository {

    private final NamedParameterJdbcTemplate jdbcTemplate;

    public JogadorRepository(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Jogador> findAll() {
        String sql = "SELECT ID_Jogador as idJogador, Nickname as nickname, fk_Dados_Dados_PK_INT as dadosId FROM Jogador";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Jogador.class));
    }

    public Optional<Jogador> findById(Integer id) {
        String sql = "SELECT ID_Jogador as idJogador, Nickname as nickname, fk_Dados_Dados_PK_INT as dadosId FROM Jogador WHERE ID_Jogador = :id";
        MapSqlParameterSource params = new MapSqlParameterSource().addValue("id", id);
        return jdbcTemplate.query(sql, params, new BeanPropertyRowMapper<>(Jogador.class)).stream().findFirst();
    }

    public Optional<Jogador> findByNickname(String nickname) {
        String sql = "SELECT ID_Jogador as idJogador, Nickname as nickname, fk_Dados_Dados_PK_INT as dadosId FROM Jogador WHERE Nickname = :nickname";
        MapSqlParameterSource params = new MapSqlParameterSource().addValue("nickname", nickname);
        return jdbcTemplate.query(sql, params, new BeanPropertyRowMapper<>(Jogador.class)).stream().findFirst();
    }

    public int save(Jogador jogador) {
        String sql = "INSERT INTO Jogador (Nickname, fk_Dados_Dados_PK_INT) VALUES (:nickname, :dadosId)";
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("nickname", jogador.getNickname())
                .addValue("dadosId", jogador.getDadosId());
        return jdbcTemplate.update(sql, params);
    }

    public int update(Jogador jogador) {
        String sql = "UPDATE Jogador SET Nickname = :nickname, fk_Dados_Dados_PK_INT = :dadosId WHERE ID_Jogador = :idJogador";
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("idJogador", jogador.getIdJogador())
                .addValue("nickname", jogador.getNickname())
                .addValue("dadosId", jogador.getDadosId());
        return jdbcTemplate.update(sql, params);
    }

    public int delete(Integer id) {
        String sql = "DELETE FROM Jogador WHERE ID_Jogador = :id";
        MapSqlParameterSource params = new MapSqlParameterSource().addValue("id", id);
        return jdbcTemplate.update(sql, params);
    }
}
