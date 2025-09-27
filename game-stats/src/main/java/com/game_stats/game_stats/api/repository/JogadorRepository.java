package com.game_stats.game_stats.api.repository;

import com.game_stats.game_stats.api.dto.JogadorResponseDTO;
import com.game_stats.game_stats.api.model.Jogador;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class JogadorRepository {

    private final NamedParameterJdbcTemplate jdbcTemplate;

    private static final BeanPropertyRowMapper<Jogador> JOGADOR_ROW_MAPPER =
            new BeanPropertyRowMapper<>(Jogador.class);

    private  static final BeanPropertyRowMapper<JogadorResponseDTO> JOGADOR_RESPONSE_DTO_BEAN_PROPERTY_ROW_MAPPER =
            new BeanPropertyRowMapper<>(JogadorResponseDTO.class);

    public List<Jogador> findAll() {
        String sql = """
                SELECT ID_Jogador            AS idJogador,
                       Nickname              AS nickname,
                       fk_Dados_Dados_PK_INT AS dadosId
                  FROM Jogador
                """;
        return jdbcTemplate.query(sql, JOGADOR_ROW_MAPPER);
    }

    public Optional<Jogador> findById(Integer id) {
        String sql = """
                SELECT ID_Jogador            AS idJogador,
                       Nickname              AS nickname,
                       fk_Dados_Dados_PK_INT AS dadosId
                  FROM Jogador
                 WHERE ID_Jogador = :id
                """;

        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("id", id);

        return jdbcTemplate.query(sql, params, JOGADOR_ROW_MAPPER)
                .stream()
                .findFirst();
    }

    public Optional<Jogador> findByNickname(String nickname) {
        String sql = """
                SELECT ID_Jogador            AS idJogador,
                       Nickname              AS nickname,
                       fk_Dados_Dados_PK_INT AS dadosId
                  FROM Jogador
                 WHERE Nickname = :nickname
                """;

        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("nickname", nickname);

        return jdbcTemplate.query(sql, params, JOGADOR_ROW_MAPPER)
                .stream()
                .findFirst();
    }

    public int save(Jogador jogador) {
        String sql = """
                INSERT INTO Jogador (Nickname, fk_Dados_Dados_PK_INT)
                VALUES (:nickname, :dadosId)
                """;

        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("nickname", jogador.getNickname())
                .addValue("dadosId", jogador.getDadosId());

        return jdbcTemplate.update(sql, params);
    }

    public int update(Jogador jogador) {
        String sql = """
                UPDATE Jogador
                   SET Nickname = :nickname,
                       fk_Dados_Dados_PK_INT = :dadosId
                 WHERE ID_Jogador = :idJogador
                """;

        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("idJogador", jogador.getIdJogador())
                .addValue("nickname", jogador.getNickname())
                .addValue("dadosId", jogador.getDadosId());

        return jdbcTemplate.update(sql, params);
    }

    public int delete(Integer id) {
        String sql = """
                DELETE FROM Jogador WHERE ID_Jogador = :id
                """;

        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("id", id);

        return jdbcTemplate.update(sql, params);
    }

    public List<Jogador> findByKdGreaterThan(Double kdMinimo) {
        String sql = """
                SELECT j.ID_Jogador            AS idJogador,
                       j.Nickname              AS nickname,
                       j.fk_Dados_Dados_PK_INT AS dadosId,
                       d.KD                    AS kd
                  FROM Jogador j
                  JOIN Dados d ON d.Dados_PK_INT = j.fk_Dados_Dados_PK_INT
                 WHERE d.KD > :kdMinimo
                 ORDER BY d.KD DESC
                """;

        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("kdMinimo", kdMinimo);

        return jdbcTemplate.query(sql, params, JOGADOR_ROW_MAPPER);
    }

    public List<Jogador> findByWinrateGreaterThan(Double winrateMinimo) {
        String sql = """
            SELECT j.ID_Jogador            AS idJogador,
                   j.Nickname              AS nickname,
                   j.fk_Dados_Dados_PK_INT AS dadosId,
                   d.Nivel                 AS nivel,
                   d.Winrate               AS winrate,
                   d.RankJogador           AS rankJogador,
                   d.Headshot              AS headshot,
                   d.KD                    AS kd
              FROM Jogador j
              JOIN Dados d ON d.Dados_PK_INT = j.fk_Dados_Dados_PK_INT
             WHERE d.Winrate > :winrateMinimo
             ORDER BY d.Winrate DESC
            """;

        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("winrateMinimo", winrateMinimo);

        return jdbcTemplate.query(sql, params, JOGADOR_ROW_MAPPER);
    }

    public List<JogadorResponseDTO> findByNivelGreaterThan(Integer nivelMinimo) {
        String sql = """
                SELECT j.ID_Jogador            AS idJogador,
                       j.Nickname              AS nickname,
                       j.fk_Dados_Dados_PK_INT AS dadosId,
                       d.Nivel                 AS nivel,
                       d.KD                    AS kd,
                       d.Winrate               AS winrate,
                       d.RankJogador           AS rankJogador,
                       d.Headshot              AS headshot
                  FROM Jogador j
                  JOIN Dados d ON d.Dados_PK_INT = j.fk_Dados_Dados_PK_INT
                 WHERE d.Nivel > :nivelMinimo
                 ORDER BY d.Nivel DESC
                """;

        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("nivelMinimo", nivelMinimo);

        return jdbcTemplate.query(sql, params, JOGADOR_RESPONSE_DTO_BEAN_PROPERTY_ROW_MAPPER);
    }

}