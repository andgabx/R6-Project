"use client";

import { useMemo } from "react";
// 1. Importe os componentes do Recharts para o Scatter Plot
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

interface KdHorasChartProps {
    players: Jogador[];
}

// Assumindo que seu tipo 'Jogador' tem estes campos:
// player.dados.kd (number)
// player.dados.horasJogadas (number)
// player.nome (string)

export const KdHorasChart = ({ players }: KdHorasChartProps) => {
    
    // Processa os dados brutos dos jogadores para o formato do gráfico
    const chartData = useMemo(() => {
        return players.map((player) => ({
            // Usei 'horas' e 'kd' como chaves curtas para o dataKey
            horas: player.dados?.horasJogadas || 0,
            kd: player.dados?.kd || 0,
            nome: player.nickname || "Desconhecido", // Para o Tooltip
        }));
    }, [players]);

    // Configuração de cor e label para o ChartContainer
    const chartConfig = useMemo(() => ({
        kd: {
            label: "K/D",
            color: "var(--chart-1)",
        },
    }), []);

    return (
        <ChartContainer
            config={chartConfig}
            className="w-full h-full"
        >
            <Card className="h-full flex flex-col">
                <CardHeader className="flex-shrink-0">
                    <CardTitle>K/D vs. Horas Jogadas</CardTitle>
                    <CardDescription>
                        Relação entre K/D e horas de jogo de cada jogador
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
                                dataKey="horas"
                                name={`Horas Jogadas`}
                                tickFormatter={(value) => `${value}`}
                                unit="h"
                            />
                            <YAxis
                                type="number"
                                dataKey="kd"
                                name="K/D"
                                tickFormatter={(value) => value.toFixed(2)}
                            />
                            
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent 
                                    labelFormatter={(label, payload) => {
                                        return payload?.[0]?.payload?.nome || "";
                                    }}
                                />}
                            />
                            
                            <Scatter
                                name="K/D"
                                dataKey="kd"
                                fill="var(--color-kd)"
                                shape="square"
                            />
                        </ScatterChart>
                    </ResponsiveContainer>
                </CardContent>
                
                <CardFooter className="flex justify-center items-center p-4 text-sm flex-shrink-0">
                    <ChartLegendContent
                        payload={[{
                            value: "K/D do Jogador",
                            dataKey: "kd",
                            type: "square",
                            color: chartConfig.kd.color,
                        }]}
                    />
                </CardFooter>
            </Card>
        </ChartContainer>
    );
};