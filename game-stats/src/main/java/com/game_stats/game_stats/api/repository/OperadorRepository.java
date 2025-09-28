package com.game_stats.game_stats.api.repository;

import com.game_stats.game_stats.api.dto.MelhorJogadorDTO;
import com.game_stats.game_stats.api.dto.OperadorPopularidadeDTO;
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
        String sql = """
            SELECT
                ID_Operador as idOperador,
                Nome as nome,
                Velocidade as velocidade,
                Blindagem as blindagem,
                Unidade_Especial as unidadeEspecial
            FROM Operador
            """;
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

    public List<OperadorPopularidadeDTO> findTop5PopularAttackOperators() {
        String sql = """
            SELECT
                O.Nome AS nome,
                COUNT(JOA.fk_Jogador_ID_Jogador) AS quantidadeJogadores
            FROM
                Jogador_Op_Atk JOA
            JOIN
                Operador O ON JOA.fk_Operador_Ataque_ID = O.ID_Operador
            GROUP BY
                O.Nome
            ORDER BY
                quantidadeJogadores DESC
            LIMIT 5;
        """;
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(OperadorPopularidadeDTO.class));
    }

    public Optional<MelhorJogadorDTO> findBestPlayerForAttackOperator(String operatorName) {
        String sql = """
            SELECT
                J.Nickname AS nickname,
                JOA.Winrate AS winrate
            FROM
                Jogador J
            JOIN
                Jogador_Op_Atk JOA ON J.ID_Jogador = JOA.fk_Jogador_ID_Jogador
            JOIN
                Operador O ON JOA.fk_Operador_Ataque_ID = O.ID_Operador
            WHERE
                O.Nome = :operatorName
            ORDER BY
                JOA.Winrate DESC
            LIMIT 1;
        """;
        // Usando MapSqlParameterSource para o parâmetro nomeado :operatorName
        MapSqlParameterSource params = new MapSqlParameterSource("operatorName", operatorName);

        return jdbcTemplate.query(sql, params, new BeanPropertyRowMapper<>(MelhorJogadorDTO.class))
                .stream()
                .findFirst();
    }
}