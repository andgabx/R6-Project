"use client";

import { useMemo } from "react";
// Importações do Recharts para Scatter Plot
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Jogador } from "@/types/jogador";

interface WlKdChartProps {
    players: Jogador[];
}

export const WlKdChart = ({ players }: WlKdChartProps) => {
    // Processa os dados brutos dos jogadores para o formato do gráfico
    const chartData = useMemo(() => {
        return players.map((player) => ({
            // Chaves curtas para o dataKey
            kd: player.dados?.kd || 0,
            wl: player.dados?.winrate || 0, // Assumindo que 'wl' é a porcentagem, ex: 65.5
            nome: player.nickname || "Desconhecido", // Para o Tooltip
        }));
    }, [players]);

    // Configuração de cor e label para o ChartContainer
    const chartConfig = useMemo(
        () => ({
            wl: {
                label: "W/L %",
                color: "var(--chart-1)",
            },
        }),
        []
    );

    return (
        <ChartContainer config={chartConfig} className="w-full h-full">
            <Card className="h-full flex flex-col">
                <CardHeader className="flex-shrink-0">
                    <CardTitle>W/L % x K/D</CardTitle>
                    <CardDescription>
                        Relação entre Taxa de Vitórias e K/D de cada jogador
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart
                            data={chartData}
                            margin={{
                                top: 20,
                                right: 30,
                                bottom: 20,
                                left: 10,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis
                                type="number"
                                dataKey="kd"
                                name="K/D"
                                tickFormatter={(value) => value.toFixed(1)}
                            />
                            <YAxis
                                type="number"
                                dataKey="wl"
                                name="W/L %"
                                unit=""
                                domain={[0, "dataMax + 5"]}
                                tickFormatter={(value) => `${value}%`}
                            />

                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        labelFormatter={(label, payload) => {
                                            return (
                                                payload?.[0]?.payload?.nome ||
                                                ""
                                            );
                                        }}
                                    />
                                }
                            />

                            <Scatter
                                name="W/L %"
                                dataKey="wl"
                                fill="var(--color-wl)"
                                shape="square"
                            />
                        </ScatterChart>
                    </ResponsiveContainer>
                </CardContent>

                <CardFooter className="flex justify-center items-center p-4 text-sm flex-shrink-0">
                    <ChartLegendContent
                        payload={[
                            {
                                value: "W/L % do Jogador",
                                dataKey: "wl",
                                type: "square",
                                color: chartConfig.wl.color,
                            },
                        ]}
                    />
                </CardFooter>
            </Card>
        </ChartContainer>
    );
};
