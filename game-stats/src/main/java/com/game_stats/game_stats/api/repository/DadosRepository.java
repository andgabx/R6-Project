package com.game_stats.game_stats.api.repository;

import com.game_stats.game_stats.api.model.Dados;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Optional;

@Repository
public class DadosRepository {

    private final JdbcTemplate jdbcTemplate;

    public DadosRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Dados> rowMapper = (rs, rowNum) -> {
        Dados d = new Dados();
        d.setId(rs.getInt("Dados_PK_INT"));
        d.setNivel(rs.getInt("Nivel"));
        d.setWinrate(rs.getDouble("Winrate"));
        d.setRankJogador(rs.getString("RankJogador"));
        d.setHeadshot(rs.getDouble("Headshot"));
        d.setKd(rs.getDouble("KD"));
        d.setPlataforma(rs.getString("Plataforma"));
        d.setHorasJogadas(rs.getInt("Horas_jogadas"));
        d.setMainRole(rs.getString("Main_role"));
        d.setPreferenciaJogo(rs.getString("Preferencia_jogo"));
        d.setFkMapaFavorito(rs.getObject("fk_Mapa_favorito", Integer.class));
        d.setFkMapaMaisVitorias(rs.getObject("fk_Mapa_mais_vitorias", Integer.class));
        d.setFkMapaMaisDerrotas(rs.getObject("fk_Mapa_mais_derrotas", Integer.class));
        return d;
    };

    public List<Dados> findAll() {
        String sql = "SELECT * FROM Dados";
        return jdbcTemplate.query(sql, rowMapper);
    }

    public Optional<Dados> findById(Integer id) {
        String sql = "SELECT * FROM Dados WHERE Dados_PK_INT = ?";
        List<Dados> result = jdbcTemplate.query(sql, rowMapper, id);
        return result.stream().findFirst();
    }
    
    public Integer saveAndReturnId(Dados dados) {
        String sql = "INSERT INTO Dados (Nivel, Winrate, RankJogador, Headshot, KD, Plataforma, Horas_jogadas, Main_role, Preferencia_jogo, fk_Mapa_favorito, fk_Mapa_mais_vitorias, fk_Mapa_mais_derrotas) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setObject(1, dados.getNivel());
            ps.setObject(2, dados.getWinrate());
            ps.setString(3, dados.getRankJogador());
            ps.setObject(4, dados.getHeadshot());
            ps.setObject(5, dados.getKd());
            ps.setString(6, dados.getPlataforma());
            ps.setObject(7, dados.getHorasJogadas());
            ps.setString(8, dados.getMainRole());
            ps.setString(9, dados.getPreferenciaJogo());
            ps.setObject(10, dados.getFkMapaFavorito());
            ps.setObject(11, dados.getFkMapaMaisVitorias());
            ps.setObject(12, dados.getFkMapaMaisDerrotas());
            return ps;
        }, keyHolder);

        return keyHolder.getKey() != null ? keyHolder.getKey().intValue() : null;
    }

    public void update(Dados dados) {
        String sql = "UPDATE Dados SET Nivel=?, Winrate=?, RankJogador=?, Headshot=?, KD=?, Plataforma=?, Horas_jogadas=?, Main_role=?, Preferencia_jogo=?, fk_Mapa_favorito=?, fk_Mapa_mais_vitorias=?, fk_Mapa_mais_derrotas=? WHERE Dados_PK_INT=?";
        jdbcTemplate.update(sql,
                dados.getNivel(), dados.getWinrate(), dados.getRankJogador(), dados.getHeadshot(), dados.getKd(),
                dados.getPlataforma(), dados.getHorasJogadas(), dados.getMainRole(), dados.getPreferenciaJogo(),
                dados.getFkMapaFavorito(), dados.getFkMapaMaisVitorias(), dados.getFkMapaMaisDerrotas(),
                dados.getId());
    }

    public void delete(Integer id) {
        jdbcTemplate.update("DELETE FROM Dados WHERE Dados_PK_INT=?", id);
    }
}