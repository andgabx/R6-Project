"use client";

import { useEffect, useMemo, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { jogadorService } from "@/services/JogadorService";
import { RankGroup } from "@/types/jogador";

export const RankChart = () => {
    const [rankGroups, setRankGroups] = useState<RankGroup[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRankGroups = async () => {
            try {
                setLoading(true);
                const data = await jogadorService.getRankGroups();
                setRankGroups(data);
            } catch (error) {
                console.error("Erro ao buscar dados de rank:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRankGroups();
    }, []);

    // Converte os dados do endpoint para o formato esperado pelo chart
    const rankChartData = useMemo(() => {
        return rankGroups.map((group) => ({
            name: group.chave,
            value: group.contagem,
        }));
    }, [rankGroups]);

    // Mapa de cores para os ranks usando cores do tema
    const rankChartConfig = useMemo(() => {
        // Função para obter a cor base do rank (remove o número/romano)
        const getRankBase = (rankName: string): string => {
            return rankName.split(" ")[0];
        };

        // Mapeia cada rank base para uma cor única do tema (chart-1 a chart-10)
        const rankBaseColorMap: { [key: string]: string } = {
            Desconhecido: "var(--chart-3)",
            Cobre: "var(--chart-6)",
            Bronze: "var(--chart-7)",
            Prata: "var(--chart-4)",
            Ouro: "var(--chart-2)",
            Platina: "var(--chart-5)",
            Esmeralda: "var(--chart-8)",
            Diamante: "var(--chart-1)",
            Campeão: "var(--chart-9)",
        };

        const defaultColor = "var(--chart-3)";

        const config: ChartConfig = {};
        rankChartData.forEach((item) => {
            const rankBase = getRankBase(item.name);
            config[item.name] = {
                label: `${item.name} (${item.value})`,
                color: rankBaseColorMap[rankBase] || defaultColor,
            };
        });
        return config;
    }, [rankChartData]);

    if (loading) {
        return (
            <Card className="flex flex-col h-full overflow-hidden">
                <CardHeader className="items-center pb-0 flex-shrink-0">
                    <CardTitle>Jogadores por Rank</CardTitle>
                    <CardDescription>
                        Distribuição de jogadores por rank
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 items-center justify-center pb-0 min-h-0">
                    <p className="text-muted-foreground">Carregando...</p>
                </CardContent>
            </Card>
        );
    }

    if (rankChartData.length === 0) {
        return (
            <Card className="flex flex-col h-full overflow-hidden">
                <CardHeader className="items-center pb-0 flex-shrink-0">
                    <CardTitle>Jogadores por Rank</CardTitle>
                    <CardDescription>
                        Distribuição de jogadores por rank
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 items-center justify-center pb-0 min-h-0">
                    <p className="text-muted-foreground">
                        Nenhum dado disponível
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <ChartContainer config={rankChartConfig} className="w-full h-[400px]">
            <Card className="flex flex-col h-full overflow-hidden">
                <CardHeader className="items-center pb-0 flex-shrink-0">
                    <CardTitle>Jogadores por Rank</CardTitle>
                    <CardDescription>
                        Distribuição de jogadores por rank
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 items-center justify-center pb-0 min-h-0">
                    <div className="mx-auto aspect-square w-full max-w-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent />}
                                />
                                <Pie
                                    data={rankChartData}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={60}
                                >
                                    {rankChartData.map((entry) => (
                                        <Cell
                                            key={`cell-${entry.name}`}
                                            fill={
                                                rankChartConfig[entry.name]
                                                    ?.color
                                            }
                                        />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>

                <CardFooter className="flex justify-center items-center p-4 text-sm flex-shrink-0 w-full">
                    <div className="w-full">
                        <ChartLegendContent
                            payload={rankChartData.map((item) => ({
                                value: item.name,
                                dataKey: item.name,
                                type: "circle",
                                color: rankChartConfig[item.name]?.color,
                            }))}
                            className="flex flex-wrap justify-center items-center gap-3 gap-y-2"
                        />
                    </div>
                </CardFooter>
            </Card>
        </ChartContainer>
    );
};
