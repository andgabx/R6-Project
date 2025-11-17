"use client";

import { useMemo, useEffect, useState } from "react";
import { Jogador } from "@/types/jogador";
import { jogadorService } from "@/services/JogadorService";
import { PlayerRadarChart } from "./PlayerRadarChart";

interface PlayerPerformanceRadarChartProps {
    player: Jogador;
}

interface BestStats {
    maxKd: number;
    maxWinrate: number;
    maxHeadshot: number;
    maxHorasJogadas: number;
}

export function PlayerPerformanceRadarChart({ player }: PlayerPerformanceRadarChartProps) {
    const [bestStats, setBestStats] = useState<BestStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBestStats = async () => {
            try {
                // Buscar todos os jogadores para calcular os melhores valores
                const allPlayers = await jogadorService.listAll();
                
                // Calcular os melhores valores de cada estatística
                let maxKd = 0;
                let maxWinrate = 0;
                let maxHeadshot = 0;
                let maxHorasJogadas = 0;

                allPlayers.forEach((p) => {
                    if (p.dados) {
                        if (p.dados.kd > maxKd) maxKd = p.dados.kd;
                        if (p.dados.winrate > maxWinrate) maxWinrate = p.dados.winrate;
                        if (p.dados.headshot > maxHeadshot) maxHeadshot = p.dados.headshot;
                        if (p.dados.horasJogadas > maxHorasJogadas) maxHorasJogadas = p.dados.horasJogadas;
                    }
                });

                setBestStats({
                    maxKd: maxKd || 1, // Evitar divisão por zero
                    maxWinrate: maxWinrate || 1,
                    maxHeadshot: maxHeadshot || 1,
                    maxHorasJogadas: maxHorasJogadas || 1,
                });
            } catch (error) {
                console.error("Erro ao buscar estatísticas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBestStats();
    }, []);

    const data = useMemo(() => {
        if (!player.dados || !bestStats) return [];

        const { kd, winrate, headshot, horasJogadas } = player.dados;

        // Comparar com os melhores valores e normalizar para 0-100%
        // Onde 100% significa que o jogador tem o melhor valor
        const normalizedKd = bestStats.maxKd > 0 
            ? Math.min((kd / bestStats.maxKd) * 100, 100) 
            : 0;

        const normalizedWinrate = bestStats.maxWinrate > 0
            ? Math.min((winrate / bestStats.maxWinrate) * 100, 100)
            : 0;

        const normalizedHeadshot = bestStats.maxHeadshot > 0
            ? Math.min((headshot / bestStats.maxHeadshot) * 100, 100)
            : 0;

        const normalizedHours = bestStats.maxHorasJogadas > 0
            ? Math.min((horasJogadas / bestStats.maxHorasJogadas) * 100, 100)
            : 0;

        return [
            { subject: 'K/D', value: Math.round(normalizedKd) },
            { subject: 'Winrate', value: Math.round(normalizedWinrate) },
            { subject: 'Headshot %', value: Math.round(normalizedHeadshot) },
            { subject: 'Experiência', value: Math.round(normalizedHours) },
        ];
    }, [player.dados, bestStats]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[250px]">
                <p className="text-muted-foreground">Carregando comparação de performance...</p>
            </div>
        );
    }

    // Se não há dados do jogador, mostrar valores zerados
    if (!player.dados || !bestStats) {
        return (
            <PlayerRadarChart
                title="Performance vs Melhor"
                description="Comparação das estatísticas do jogador em relação ao melhor valor de cada métrica."
                data={[
                    { subject: 'K/D', value: 0 },
                    { subject: 'Winrate', value: 0 },
                    { subject: 'Headshot %', value: 0 },
                    { subject: 'Experiência', value: 0 },
                ]}
            />
        );
    }

    // Garantir que sempre temos dados
    if (data.length === 0) {
        return (
            <PlayerRadarChart
                title="Performance vs Melhor"
                description="Comparação das estatísticas do jogador em relação ao melhor valor de cada métrica."
                data={[
                    { subject: 'K/D', value: 0 },
                    { subject: 'Winrate', value: 0 },
                    { subject: 'Headshot %', value: 0 },
                    { subject: 'Experiência', value: 0 },
                ]}
            />
        );
    }

    return (
        <PlayerRadarChart
            title="Performance vs Melhor"
            description="Comparação das estatísticas do jogador em relação ao melhor valor de cada métrica."
            data={data}
        />
    );
}

