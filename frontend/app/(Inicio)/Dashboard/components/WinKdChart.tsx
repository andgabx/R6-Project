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
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Jogador } from "@/types/jogador";

interface WlKdChartProps {
    players: Jogador[];
}

// Assumindo que seu tipo 'Jogador' tem estes campos:
// player.dados.kd (number)
// player.dados.wl (number, ex: 54.5 para 54.5%)
// player.nome (string)

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
    const chartConfig = useMemo(() => ({
        wl: {
            label: "W/L %",
            color: "hsl(var(--chart-1))", // Cor principal (azul/ciano)
        },
    }), []);

    return (
        <ChartContainer
            config={chartConfig}
            // Gráficos de dispersão geralmente precisam de mais altura
            className="w-full h-[400px]" 
        >
            <Card className="flex flex-col h-full">
                <CardHeader className="items-center pb-0">
                    <CardTitle>W/L % x K/D</CardTitle>
                    <CardDescription>
                        Relação entre Taxa de Vitórias e K/D de cada jogador
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
                                dataKey="kd"
                                name="K/D"
                                // Formata o label do eixo X
                                tickFormatter={(value) => value.toFixed(1)}
                            />
                            <YAxis
                                type="number"
                                dataKey="wl"
                                name="W/L %"
                                unit="%" // Adiciona o sufixo '%'
                                // Limita o domínio do eixo Y de 0 a 100+
                                domain={[0, 'dataMax + 5']} 
                                tickFormatter={(value) => `${value}%`}
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
                                name="W/L %" // Conecta ao chartConfig 'wl'
                                dataKey="wl" // Necessário para o tooltip funcionar bem
                                fill="var(--color-wl)" // Cor vinda do chartConfig
                                shape="square" // Forma de quadrado, como na referência
                            />
                        </ScatterChart>
                    </ResponsiveContainer>
                </CardContent>
                
                <CardFooter className="flex justify-center p-4 text-sm">
                    <ChartLegend
                        payload={[{
                            value: "W/L % do Jogador",
                            type: "square",
                            color: chartConfig.wl.color,
                        }]}
                        className="[&_p]:text-foreground"
                    />
                </CardFooter>
            </Card>
        </ChartContainer>
    );
};