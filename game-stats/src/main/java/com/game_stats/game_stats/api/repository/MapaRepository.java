package com.game_stats.game_stats.api.repository;

import com.game_stats.game_stats.api.model.Mapa;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class MapaRepository {

    private final JdbcTemplate jdbcTemplate;

    public MapaRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Mapa> rowMapper = (rs, rowNum) -> {
        Mapa mapa = new Mapa();
        mapa.setIdMapa(rs.getInt("ID_Mapa"));
        mapa.setNome(rs.getString("Nome"));
        return mapa;
    };

    // Listar todos os mapas
    public List<Mapa> findAll() {
        return jdbcTemplate.query("SELECT * FROM Mapa", rowMapper);
    }

    // Buscar por ID
    public Optional<Mapa> findById(Integer id) {
        return jdbcTemplate.query("SELECT * FROM Mapa WHERE ID_Mapa = ?", rowMapper, id)
                .stream().findFirst();
    }

    // Inserir novo mapa
    public void save(Mapa mapa) {
        jdbcTemplate.update("INSERT INTO Mapa (Nome) VALUES (?)",
                mapa.getNome());
    }

    // Atualizar mapa existente
    public void update(Mapa mapa) {
        jdbcTemplate.update("UPDATE Mapa SET Nome = ? WHERE ID_Mapa = ?",
                mapa.getNome(), mapa.getIdMapa());
    }

    // Deletar por ID
    public void delete(Integer id) {
        jdbcTemplate.update("DELETE FROM Mapa WHERE ID_Mapa = ?", id);
    }
}