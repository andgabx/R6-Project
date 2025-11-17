"use client";

import { useMemo } from "react";
// 👇 1. Importe o ResponsiveContainer
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
import { Jogador } from "@/types/jogador";

interface FavoriteMapChartProps {
    players: Jogador[];
}

export const FavoriteMapChart = ({ players }: FavoriteMapChartProps) => {
    // ... (lógica de dados 'favoriteMapChartData' inalterada)
    const favoriteMapChartData = useMemo(() => {
        return players.reduce((acc, player) => {
            const mapName = player.dados?.mapaFavorito?.nome || "Desconhecido";
            const existing = acc.find((item) => item.name === mapName);
            if (existing) {
                existing.value++;
            } else {
                acc.push({ name: mapName, value: 1 });
            }
            return acc;
        }, [] as { name: string; value: number }[]);
    }, [players]);

    const favoriteMapChartConfig = useMemo(() => {
        const config: ChartConfig = {};
        favoriteMapChartData.forEach((item, index) => {
            const chartIndex = (index % 5) + 1; // Cicla entre chart-1 a chart-5
            config[item.name] = {
                label: item.name,
                color: `var(--chart-${chartIndex})`,
            };
        });
        return config;
    }, [favoriteMapChartData]);

    return (
        <ChartContainer
            config={favoriteMapChartConfig}
            className="w-full h-full"
        >
            <Card className="h-full flex flex-col">
                <CardHeader className="flex-shrink-0">
                    <CardTitle>Mapas Favoritos</CardTitle>
                    <CardDescription>
                        Análise da distribuição dos mapas favoritos
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex items-center justify-center min-h-0">
                    <div className="mx-auto aspect-square w-full max-w-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie data={favoriteMapChartData} dataKey="value" nameKey="name" innerRadius={60}>
                                    {favoriteMapChartData.map((entry) => (
                                        <Cell
                                            key={`cell-${entry.name}`}
                                            fill={
                                                favoriteMapChartConfig[
                                                    entry.name
                                                ]?.color
                                            }
                                        />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center items-center p-4 text-sm flex-shrink-0">
                    <ChartLegendContent
                        payload={favoriteMapChartData.map((item) => ({
                            value: item.name,
                            type: "circle",
                            color: favoriteMapChartConfig[item.name]?.color,
                        }))}
                        className="flex flex-wrap justify-center items-center gap-3 gap-y-2"
                    />
                </CardFooter>
            </Card>
        </ChartContainer>
    );
};