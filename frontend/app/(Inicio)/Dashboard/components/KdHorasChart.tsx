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
    ChartLegend,
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
            color: "hsl(var(--chart-1))", // Cor principal (azul/ciano)
        },
    }), []);

    return (
        <ChartContainer
            config={chartConfig}
            // Gráficos de dispersão geralmente precisam de mais altura
            className="w-full" 
        >
            <Card className="flex flex-col h-full">
                <CardHeader className="items-center pb-0">
                    <CardTitle>K/D vs. Horas Jogadas</CardTitle>
                    <CardDescription>
                        Relação entre K/D e horas de jogo de cada jogador
                    </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart
                            data={chartData}
                            margin={{
                                top: 20,
                                right: 30, // Dê espaço para os labels do eixo Y
                                bottom: 20,
                                left: 10,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            
                            <XAxis
                                type="number"
                                dataKey="horas"
                                name={`Horas Jogadas`}
                                // Formata o label do eixo X
                                tickFormatter={(value) => `${value}`}
                                unit="h"
                            />
                            <YAxis
                                type="number"
                                dataKey="kd"
                                name="K/D"
                                // Formata o label do eixo Y
                                tickFormatter={(value) => value.toFixed(2)}
                            />
                            
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent 
                                    // Mostra o nome do jogador no título do tooltip
                                    labelFormatter={(label, payload) => {
                                        return payload?.[0]?.payload?.nome || "";
                                    }}
                                />}
                            />
                            
                            <Scatter
                                name="K/D" // Conecta ao chartConfig 'kd'
                                dataKey="kd" // Necessário para o tooltip funcionar bem
                                fill="var(--color-kd)" // Cor vinda do chartConfig
                                shape="square" // Forma de quadrado, como na referência
                            />
                        </ScatterChart>
                    </ResponsiveContainer>
                </CardContent>
                
                <CardFooter className="flex justify-center p-4 text-sm">
                    {/* A legenda para scatter precisa ser criada manualmente */}
                    <ChartLegend
                        payload={[{
                            value: "K/D do Jogador",
                            type: "square",
                            color: chartConfig.kd.color,
                        }]}
                        className="[&_p]:text-foreground"
                    />
                </CardFooter>
            </Card>
        </ChartContainer>
    );
};