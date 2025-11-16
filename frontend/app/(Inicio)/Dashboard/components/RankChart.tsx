"use client";

import { useMemo } from "react";
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
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Jogador } from "@/types/jogador";

interface RankChartProps {
    players: Jogador[];
}

export const RankChart = ({ players }: RankChartProps) => {
    // 👇 ALTERAÇÃO AQUI: Lógica de dados para agrupar os ranks
    const rankChartData = useMemo(() => {
        return players.reduce((acc, player) => {
            const rawRank = player.dados?.rankJogador || "Desconhecido";

            // Pega o nome base do rank (ex: "Ouro I" -> "Ouro")
            // Se não houver espaço, usa o nome completo (ex: "Campeão")
            const rankName = rawRank.split(" ")[0];

            const existing = acc.find((item) => item.name === rankName);
            if (existing) {
                existing.value++;
            } else {
                acc.push({ name: rankName, value: 1 });
            }
            return acc;
        }, [] as { name: string; value: number }[]);
    }, [players]);

    // 👇 ALTERAÇÃO AQUI: Mapa de cores simplificado para os ranks base
    const rankChartConfig = useMemo(() => {
        // Mapeia os NOMES BASE para as cores
        const rankColorMap: { [key: string]: string } = {
            Desconhecido: "hsl(210, 9%, 45%)",
            Cobre: "hsl(20, 60%, 45%)",
            Bronze: "hsl(30, 60%, 40%)",
            Prata: "hsl(210, 10%, 75%)",
            Ouro: "hsl(50, 80%, 50%)",
            Platina: "hsl(200, 40%, 60%)",
            Esmeralda: "hsl(140, 60%, 35%)",
            Diamante: "hsl(190, 80%, 50%)",
            Campeão: "hsl(320, 70%, 50%)",
        };

        const defaultColor = "hsl(0, 0%, 70%)";

        const config: ChartConfig = {};
        rankChartData.forEach((item) => {
            config[item.name] = {
                label: item.name,
                // O 'item.name' agora é "Ouro", "Prata", etc.
                color: rankColorMap[item.name] || defaultColor,
            };
        });
        return config;
    }, [rankChartData]);

    return (
        <ChartContainer config={rankChartConfig} className="w-full">
            <Card className="flex flex-col">
                <CardHeader className="items-center pb-0">
                    <CardTitle>Jogadores por Rank (Agrupado)</CardTitle>
                    <CardDescription>
                        Distribuição de jogadores por tier de rank
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 items-center justify-center pb-0">
                    <div className="mx-auto aspect-square w-full max-w-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                {/* Tooltip corrigido para mostrar o nome */}
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

                {/* A legenda agora mostrará os ranks agrupados */}
                <CardFooter className="flex justify-center p-4 text-sm">
                    
                    {/* Note como está mais limpo.
                      ChartLegend é o único componente que você precisa.
                    */}
                    <ChartLegend
                        // 1. Passe o payload diretamente para o ChartLegend
                        payload={rankChartData.map((item) => ({
                            value: `${item.name} (${item.value})`,
                            type: "circle",
                            color: rankChartConfig[item.name]?.color,
                        }))}

                        // 2. Passe o className do layout e a correção de cor AQUI
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-42 max-h-40"
                    />

                </CardFooter>
            </Card>
        </ChartContainer>
    );
};
