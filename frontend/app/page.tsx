"use client";

import { useEffect, useState, useMemo } from "react";
import { jogadorService } from "@/services/JogadorService";
import { Jogador } from "@/types/jogador";
import {
    Users,
    Shield,
    Map,
    TrendingUp,
    Activity,
    Clock,
    BarChart3,
} from "lucide-react";
import { MetricCard } from "./(Inicio)/Dashboard/components/MetricCard";
import { ActionCard } from "./(Inicio)/Dashboard/components/ActionCard";
import { PerformanceChart } from "./(Inicio)/Dashboard/components/PerformanceChart";
import { RecentActivity } from "./(Inicio)/Dashboard/components/RecentActivity";
import { RecentPlayersTable } from "./(Inicio)/Dashboard/components/RecentPlayersTable";

export default function HomePage() {
    const [players, setPlayers] = useState<Jogador[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const perfis = await jogadorService.listPerfis();
                // Converter JogadorPerfil para Jogador
                const jogadores: Jogador[] = perfis.map((perfil) => ({
                    idJogador: perfil.idJogador,
                    nickname: perfil.nickname,
                    operadoresAtaque: [],
                    operadoresDefesa: [],
                    dados: {
                        id: perfil.idJogador,
                        nivel: perfil.nivel,
                        rankJogador: perfil.rankJogador,
                        winrate: perfil.winrateGeral,
                        kd: perfil.kd,
                        horasJogadas: perfil.horasJogadas,
                        plataforma: perfil.plataforma,
                        headshot: 0,
                        mainRole: "",
                        preferenciaJogo: "",
                        mapaFavorito: perfil.mapaFavorito
                            ? { idMapa: 0, nome: perfil.mapaFavorito }
                            : null,
                        mapaMaisVitorias: perfil.mapaMaisVitorias
                            ? { idMapa: 0, nome: perfil.mapaMaisVitorias }
                            : null,
                        mapaMaisDerrotas: perfil.mapaMaisDerrotas
                            ? { idMapa: 0, nome: perfil.mapaMaisDerrotas }
                            : null,
                    },
                }));
                setPlayers(jogadores);
            } catch (error) {
                console.error("Failed to fetch players:", error);
            }
        };

        fetchData();
    }, []);

    // Calcular métricas
    const metrics = useMemo(() => {
        const totalPlayers = players.length;
        const avgKd =
            players.length > 0
                ? players.reduce((sum, p) => sum + (p.dados?.kd || 0), 0) /
                  players.length
                : 0;
        const avgWinRate =
            players.length > 0
                ? players.reduce((sum, p) => sum + (p.dados?.winrate || 0), 0) /
                  players.length
                : 0;
        const totalHours =
            players.reduce((sum, p) => sum + (p.dados?.horasJogadas || 0), 0) /
            1000;

        return {
            totalPlayers,
            avgKd: avgKd.toFixed(2),
            avgWinRate: avgWinRate.toFixed(1),
            totalHours: totalHours.toFixed(1),
        };
    }, [players]);

    // Dados para o gráfico de performance (mock data por enquanto)
    const performanceData = [
        { month: "Jan", value: 1200 },
        { month: "Fev", value: 1900 },
        { month: "Mar", value: 1500 },
        { month: "Abr", value: 2100 },
        { month: "Mai", value: 1800 },
        { month: "Jun", value: 2400 },
        { month: "Jul", value: 2200 },
    ];

    return (
        <div className="bg-background min-h-screen">
            <main className="container mx-auto px-4 py-6 md:py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        Dashboard Overview
                    </h1>
                    <p className="text-muted-foreground">
                        Monitore seus jogadores e performance do sistema
                    </p>
                </div>

                {/* Action Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 items-stretch">
                    <ActionCard
                        title="Jogadores"
                        description="Gerencie perfis e estatísticas dos jogadores"
                        icon={Users}
                        href="/Jogadores"
                        color="green"
                    />
                    <ActionCard
                        title="Operadores"
                        description="Explore informações dos operadores"
                        icon={Shield}
                        href="/Operadores"
                        color="blue"
                    />
                    <ActionCard
                        title="Mapas"
                        description="Visualize todos os mapas do jogo"
                        icon={Map}
                        href="/Mapas"
                        color="purple"
                    />
                    <ActionCard
                        title="Dashboard"
                        description="Visualize gráficos e análises detalhadas"
                        icon={BarChart3}
                        href="/Dashboard"
                        color="orange"
                    />
                </div>

                {/* Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <MetricCard
                        title="Total de Jogadores"
                        value={metrics.totalPlayers}
                        change={{ value: 12, isPositive: true }}
                        icon={<Users className="h-4 w-4" />}
                    />
                    <MetricCard
                        title="K/D Médio"
                        value={metrics.avgKd}
                        change={{ value: 0.3, isPositive: true }}
                        icon={<TrendingUp className="h-4 w-4" />}
                    />
                    <MetricCard
                        title="Win Rate Médio"
                        value={`${metrics.avgWinRate}%`}
                        change={{ value: 2.1, isPositive: true }}
                        icon={<Activity className="h-4 w-4" />}
                    />
                    <MetricCard
                        title="Horas Totais"
                        value={`${metrics.totalHours}K`}
                        change={{ value: 8.2, isPositive: true }}
                        icon={<Clock className="h-4 w-4" />}
                    />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 items-stretch">
                    {/* Performance Chart - Takes 2 columns */}
                    <div className="lg:col-span-2 flex">
                        <div className="w-full flex flex-col">
                            <PerformanceChart data={performanceData} />
                        </div>
                    </div>

                    {/* Recent Activity - Takes 1 column */}
                    <div className="flex">
                        <div className="w-full flex flex-col">
                            <RecentActivity />
                        </div>
                    </div>
                </div>

                {/* Recent Players Table */}
                <div className="mb-8">
                    <RecentPlayersTable players={players} />
                </div>
            </main>
        </div>
    );
}
