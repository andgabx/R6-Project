"use client";

import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { jogadorService } from "@/services/JogadorService";
import { MaxKdPlayer } from "@/types/jogador";

interface KdMetricCardProps {
    avgKd: string;
    players: any[];
}

type ViewMode = "average" | "max";

export const KdMetricCard = ({ avgKd, players }: KdMetricCardProps) => {
    const [viewMode, setViewMode] = useState<ViewMode>("average");
    const [maxKdPlayer, setMaxKdPlayer] = useState<MaxKdPlayer | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMaxKd = async () => {
            try {
                setLoading(true);
                const data = await jogadorService.getMaxKdPlayer();
                if (data && data.length > 0) {
                    setMaxKdPlayer(data[0]);
                }
            } catch (error) {
                console.error("Erro ao buscar jogador com maior K/D:", error);
            } finally {
                setLoading(false);
            }
        };

        if (viewMode === "max") {
            fetchMaxKd();
        }
    }, [viewMode]);

    const nextView = () => {
        setViewMode((prev) => (prev === "average" ? "max" : "average"));
    };

    const prevView = () => {
        setViewMode((prev) => (prev === "average" ? "max" : "average"));
    };

    return (
        <Card className="relative">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {viewMode === "average" ? "K/D Médio" : "Maior K/D"}
                </CardTitle>
                <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    {/* Botões de navegação */}
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={prevView}
                        >
                            <ChevronLeft className="h-3 w-3" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={nextView}
                        >
                            <ChevronRight className="h-3 w-3" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {viewMode === "average" ? (
                    <>
                        <div className="text-2xl font-bold">{avgKd}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Média de todos os jogadores
                        </p>
                    </>
                ) : (
                    <>
                        {loading ? (
                            <div className="text-2xl font-bold">...</div>
                        ) : maxKdPlayer ? (
                            <>
                                <div className="text-2xl font-bold">
                                    {maxKdPlayer.kd.toFixed(2)}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {maxKdPlayer.nickname}
                                </p>
                            </>
                        ) : (
                            <div className="text-2xl font-bold">-</div>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    );
};

