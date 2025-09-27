package com.game_stats.game_stats.api.repository;

import com.game_stats.game_stats.api.model.Dados;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class DadosRepository {

    private final JdbcTemplate jdbcTemplate;

    public DadosRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private RowMapper<Dados> rowMapper = (rs, rowNum) -> {
        Dados d = new Dados();
        d.setId(rs.getInt("Dados_PK_INT"));
        d.setNivel(rs.getInt("Nivel"));
        d.setWinrate(rs.getDouble("Winrate"));
        d.setRankJogador(rs.getString("RankJogador"));
        d.setHeadshot(rs.getDouble("Headshot"));
        d.setKd(rs.getDouble("KD"));
        return d;
    };

    public List<Dados> findAll() {
        return jdbcTemplate.query("SELECT * FROM Dados", rowMapper);
    }

    public Optional<Dados> findById(Integer id) {
        List<Dados> result = jdbcTemplate.query(
                "SELECT * FROM Dados WHERE Dados_PK_INT = ?", rowMapper, id);
        return result.stream().findFirst();
    }

    public Dados save(Dados dados) {
        jdbcTemplate.update(
                "INSERT INTO Dados (Nivel, Winrate, RankJogador, Headshot, KD) VALUES (?, ?, ?, ?, ?)",
                dados.getNivel(), dados.getWinrate(), dados.getRankJogador(), dados.getHeadshot(), dados.getKd()
        );
        return dados; // antonio se tu precisar do id gerado tu usa keyholder que fica safe
    }

    public void update(Dados dados) {
        jdbcTemplate.update(
                "UPDATE Dados SET Nivel=?, Winrate=?, RankJogador=?, Headshot=?, KD=? WHERE Dados_PK_INT=?",
                dados.getNivel(), dados.getWinrate(), dados.getRankJogador(), dados.getHeadshot(), dados.getKd(), dados.getId()
        );
    }

    public void delete(Integer id) {
        jdbcTemplate.update("DELETE FROM Dados WHERE Dados_PK_INT=?", id);
    }
}