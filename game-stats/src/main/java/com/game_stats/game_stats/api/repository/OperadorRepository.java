package com.game_stats.game_stats.api.repository;

import com.game_stats.game_stats.api.model.Operador;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class OperadorRepository {

    private final NamedParameterJdbcTemplate jdbcTemplate;

    public OperadorRepository(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // Buscar todos
    public List<Operador> findAll() {
        String sql = "SELECT ID_Operador as idOperador, " +
                "Nome as nome, " +
                "Funcao as funcao, " +
                "fk_Arma_ID_Arma as armaId " +
                "FROM Operador";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Operador.class));
    }

    // Buscar por ID
    public Optional<Operador> findById(Integer id) {
        String sql = "SELECT ID_Operador as idOperador, " +
                "Nome as nome, " +
                "Funcao as funcao, " +
                "fk_Arma_ID_Arma as armaId " +
                "FROM Operador WHERE ID_Operador = :id";
        return jdbcTemplate.query(sql, new MapSqlParameterSource("id", id),
                        new BeanPropertyRowMapper<>(Operador.class))
                .stream()
                .findFirst();
    }

    // Criar
    public int save(Operador operador) {
        String sql = "INSERT INTO Operador (Nome, Funcao, fk_Arma_ID_Arma) " +
                "VALUES (:nome, :funcao, :armaId)";
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("nome", operador.getNome())
                .addValue("funcao", operador.getFuncao())
                .addValue("armaId", operador.getArmaId());
        return jdbcTemplate.update(sql, params);
    }

    // Atualizar
    public int update(Operador operador) {
        String sql = "UPDATE Operador " +
                "SET Nome = :nome, Funcao = :funcao, fk_Arma_ID_Arma = :armaId " +
                "WHERE ID_Operador = :idOperador";
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("idOperador", operador.getIdOperador())
                .addValue("nome", operador.getNome())
                .addValue("funcao", operador.getFuncao())
                .addValue("armaId", operador.getArmaId());
        return jdbcTemplate.update(sql, params);
    }

    // Deletar
    public int delete(Integer id) {
        String sql = "DELETE FROM Operador WHERE ID_Operador = :id";
        return jdbcTemplate.update(sql, new MapSqlParameterSource("id", id));
    }
}