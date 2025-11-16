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

    // ... (lógica de config 'favoriteMapChartConfig' inalterada)
    const favoriteMapChartConfig = useMemo(() => {
        const config: ChartConfig = {};
        favoriteMapChartData.forEach((item, index) => {
            config[item.name] = {
                label: item.name,
                color: `hsl(var(--chart-${index + 1}))`,
            };
        });
        return config;
    }, [favoriteMapChartData]);

    return (
        <ChartContainer
            config={favoriteMapChartConfig}
            className="w-full"
        >
            <Card className="flex flex-col">
                <CardHeader className="items-center pb-0">
                    <CardTitle>Mapas Favoritos</CardTitle>
                    <CardDescription>
                        Análise da distribuição dos mapas favoritos
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 items-center justify-center pb-0">
                    <div className="mx-auto aspect-square w-full max-w-[250px]">

                        {/* 👇 2. Envolva o PieChart com o ResponsiveContainer */}
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
                        {/* 👆 Fim da correção */}

                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">
                    <ChartLegendContent
                        payload={favoriteMapChartData.map((item) => ({
                            value: item.name,
                            type: "circle",
                            color: favoriteMapChartConfig[item.name]?.color,
                        }))}
                    />
                </CardFooter>
            </Card>
        </ChartContainer>
    );
};