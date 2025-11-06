package com.game_stats.game_stats.api.service;

import com.game_stats.game_stats.api.dto.*;
import com.game_stats.game_stats.api.repository.StatsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StatsService {

    private final StatsRepository statsRepository;

    // ETAPA 06
    public KpiDTO getKpis() {
        return statsRepository.getKpis();
    }

    public List<StatsAgrupadosDTO> getJogadoresPorRank() {
        return statsRepository.getJogadoresPorRank();
    }

    public List<StatsAgrupadosDTO> getJogadoresPorRole() {
        return statsRepository.getJogadoresPorRole();
    }

    public List<ScatterPlotDTO> getKdVsHeadshot() {
        return statsRepository.getKdVsHeadshot();
    }

    // ETAPA 04
    public List<ConsultaAntiJoinDTO> getConsultaAntiJoin() {
        return statsRepository.getConsultaAntiJoin();
    }

    public List<ConsultaFullJoinDTO> getConsultaFullJoin() {
        return statsRepository.getConsultaFullJoin();
    }

    public List<ConsultaSubMaxDTO> getConsultaSubMax() {
        return statsRepository.getConsultaSubMax();
    }

    public List<ConsultaSubInDTO> getConsultaSubIn(String mapaNome) {
        return statsRepository.getConsultaSubIn(mapaNome);
    }

    public List<ViewPerfilJogadorDTO> getViewPerfilJogador() {
        return statsRepository.getViewPerfilJogador();
    }

    public List<ViewMetaAtaqueDTO> getViewMetaAtaque() {
        return statsRepository.getViewMetaAtaque();
    }

    // ETAPA 05
    public void callRecalcularRanks() {
        statsRepository.callRecalcularRanks();
    }

    public List<RankLogDTO> getRankLogs() {
        return statsRepository.getRankLogs();
    }
}