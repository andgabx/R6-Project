"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Jogador } from "@/types/jogador";
import { RankChart } from "./RankChart";
import { WlKdChart } from "./WinKdChart";
import { FavoriteMapChart } from "./FavoriteMapChart";
import { KdHorasChart } from "./KdHorasChart";
import { KdHeadshotChart } from "./KdHeadshotChart";
import { PlatformChart } from "./PlatformChart";

interface PerformanceChartProps {
    players?: Jogador[];
}

type ChartType = {
    id: string;
    name: string;
    requiresPlayers: boolean;
};

export const PerformanceChart = ({ players = [] }: PerformanceChartProps) => {
    const charts: ChartType[] = [
        {
            id: "rank",
            name: "Jogadores por Rank",
            requiresPlayers: false,
        },
        {
            id: "platform",
            name: "Jogadores por Plataforma",
            requiresPlayers: true,
        },
        {
            id: "favoriteMap",
            name: "Mapas Favoritos",
            requiresPlayers: true,
        },
        {
            id: "kdHoras",
            name: "K/D vs. Horas Jogadas",
            requiresPlayers: true,
        },
        {
            id: "wlKd",
            name: "W/L % x K/D",
            requiresPlayers: true,
        },
        {
            id: "kdHeadshot",
            name: "K/D vs. Headshot %",
            requiresPlayers: true,
        },
    ];

    const [currentChartIndex, setCurrentChartIndex] = useState(0);

    const currentChart = charts[currentChartIndex];

    const renderChart = () => {
        switch (currentChart.id) {
            case "rank":
                return <RankChart />;
            case "platform":
                return <PlatformChart players={players} />;
            case "favoriteMap":
                return <FavoriteMapChart players={players} />;
            case "kdHoras":
                return <KdHorasChart players={players} />;
            case "wlKd":
                return <WlKdChart players={players} />;
            case "kdHeadshot":
                return <KdHeadshotChart players={players} />;
            default:
                return null;
        }
    };

    const nextChart = () => {
        setCurrentChartIndex((prev) => (prev + 1) % charts.length);
    };

    const prevChart = () => {
        setCurrentChartIndex(
            (prev) => (prev - 1 + charts.length) % charts.length
        );
    };

    // Se o chart atual requer players e não temos players, mostrar mensagem
    if (currentChart.requiresPlayers && players.length === 0) {
        return (
            <div className="h-full flex items-center justify-center border rounded-lg p-8">
                <p className="text-muted-foreground">
                    Carregando dados dos jogadores...
                </p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col relative">
            {/* Navegação com setas */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={prevChart}
                    className="h-8 w-8"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground min-w-[150px] text-center">
                    {currentChart.name}
                </span>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={nextChart}
                    className="h-8 w-8"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>

            {/* Chart atual */}
            <div className="flex-1 min-h-0">{renderChart()}</div>
        </div>
    );
};
