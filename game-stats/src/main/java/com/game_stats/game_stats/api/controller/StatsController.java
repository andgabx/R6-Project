package com.game_stats.game_stats.api.controller;

import com.game_stats.game_stats.api.dto.*;
import com.game_stats.game_stats.api.service.StatsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stats")
@Tag(name = "Estatísticas e Consultas Avançadas", description = "Endpoints para Etapas 04, 05 e 06")
@RequiredArgsConstructor
public class StatsController {

    private final StatsService statsService;

    // --- ETAPA 06: Dashboard KPIs ---
    @GetMapping("/kpis")
    @Operation(summary = "Busca os KPIs resumidos para o Dashboard")
    public ResponseEntity<KpiDTO> getKpis() {
        return ResponseEntity.ok(statsService.getKpis());
    }

    // --- ETAPA 06: Gráficos Dinâmicos ---
    @GetMapping("/group/by-rank")
    @Operation(summary = "Agrupa jogadores por rank (Gráfico de Barras)")
    public ResponseEntity<List<StatsAgrupadosDTO>> getJogadoresPorRank() {
        return ResponseEntity.ok(statsService.getJogadoresPorRank());
    }

    @GetMapping("/group/by-role")
    @Operation(summary = "Agrupa jogadores por função principal (Gráfico de Barras)")
    public ResponseEntity<List<StatsAgrupadosDTO>> getJogadoresPorRole() {
        return ResponseEntity.ok(statsService.getJogadoresPorRole());
    }

    @GetMapping("/scatter/kd-vs-headshot")
    @Operation(summary = "Retorna dados para gráfico de dispersão (KD vs Headshot)")
    public ResponseEntity<List<ScatterPlotDTO>> getKdVsHeadshot() {
        return ResponseEntity.ok(statsService.getKdVsHeadshot());
    }

    // --- ETAPA 04: Consultas Avançadas ---
    @GetMapping("/query/anti-join-operadores")
    @Operation(summary = "Etapa 04 - Consulta 1 (Anti Join): Operadores de ataque não usados")
    public ResponseEntity<List<ConsultaAntiJoinDTO>> getConsultaAntiJoin() {
        return ResponseEntity.ok(statsService.getConsultaAntiJoin());
    }

    @GetMapping("/query/full-join-jogadores-times")
    @Operation(summary = "Etapa 04 - Consulta 2 (Full Join): Relação Jogadores e Times")
    public ResponseEntity<List<ConsultaFullJoinDTO>> getConsultaFullJoin() {
        return ResponseEntity.ok(statsService.getConsultaFullJoin());
    }

    @GetMapping("/query/sub-max-kd")
    @Operation(summary = "Etapa 04 - Consulta 3 (Subconsulta Max): Jogador(es) com maior K/D")
    public ResponseEntity<List<ConsultaSubMaxDTO>> getConsultaSubMax() {
        return ResponseEntity.ok(statsService.getConsultaSubMax());
    }

    @GetMapping("/query/sub-in-times-mapa/{mapaNome}")
    @Operation(summary = "Etapa 04 - Consulta 4 (Subconsulta IN): Times que jogaram em um mapa")
    public ResponseEntity<List<ConsultaSubInDTO>> getConsultaSubIn(@PathVariable String mapaNome) {
        return ResponseEntity.ok(statsService.getConsultaSubIn(mapaNome));
    }

    // --- ETAPA 04: Views ---
    @GetMapping("/view/perfis-jogadores")
    @Operation(summary = "Etapa 04 - Visão 1: Perfis completos dos jogadores")
    public ResponseEntity<List<ViewPerfilJogadorDTO>> getViewPerfilJogador() {
        return ResponseEntity.ok(statsService.getViewPerfilJogador());
    }

    @GetMapping("/view/meta-ataque")
    @Operation(summary = "Etapa 04 - Visão 2: Meta dos operadores de ataque")
    public ResponseEntity<List<ViewMetaAtaqueDTO>> getViewMetaAtaque() {
        return ResponseEntity.ok(statsService.getViewMetaAtaque());
    }

    // --- ETAPA 05: Procedures e Triggers ---
    @PostMapping("/procedure/recalcular-ranks")
    @Operation(summary = "Etapa 05 - Procedimento: Recalcula todos os ranks baseado no K/D")
    public ResponseEntity<Void> callRecalcularRanks() {
        statsService.callRecalcularRanks();
        return ResponseEntity.ok().build();
    }

    @GetMapping("/trigger/rank-logs")
    @Operation(summary = "Etapa 05 - Trigger: Mostra o log de alterações de rank")
    public ResponseEntity<List<RankLogDTO>> getRankLogs() {
        return ResponseEntity.ok(statsService.getRankLogs());
    }
}