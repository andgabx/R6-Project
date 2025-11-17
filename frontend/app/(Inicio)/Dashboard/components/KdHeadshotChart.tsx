"use client";

import { useEffect, useState, useMemo } from "react";
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
import { jogadorService } from "@/services/JogadorService";
import { KdHeadshotScatterData } from "@/types/jogador";

export const KdHeadshotChart = () => {
    const [scatterData, setScatterData] = useState<KdHeadshotScatterData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await jogadorService.getKdHeadshotScatter();
                setScatterData(data);
            } catch (error) {
                console.error("Erro ao buscar dados do scatter plot:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Processar dados para o formato do gráfico
    // O endpoint já retorna x (K/D) e y (Headshot %), mas precisamos adicionar um nome para o tooltip
    const chartData = useMemo(() => {
        return scatterData.map((point, index) => ({
            kd: point.x,
            headshot: point.y, // Já vem como porcentagem (0-100)
            nome: `Jogador ${index + 1}`, // Placeholder, já que o endpoint não retorna nome
        }));
    }, [scatterData]);

    // Configuração de cor e label para o ChartContainer
    const chartConfig = useMemo(
        () => ({
            kd: {
                label: "K/D",
                color: "var(--chart-1)",
            },
            headshot: {
                label: "Headshot %",
                color: "var(--chart-2)",
            },
        }),
        []
    );

    return (
        <ChartContainer config={chartConfig} className="w-full h-full">
            <Card className="h-full flex flex-col">
                <CardHeader className="flex-shrink-0">
                    <CardTitle>K/D vs. Headshot %</CardTitle>
                    <CardDescription>
                        Relação entre K/D e porcentagem de headshot de cada
                        jogador
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 min-h-0">
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-muted-foreground text-center">
                                Carregando dados...
                            </p>
                        </div>
                    ) : chartData.length === 0 ? (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-muted-foreground text-center">
                                Nenhum dado disponível para exibir.
                            </p>
                        </div>
                    ) : (
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
                                    tickFormatter={(value) => value.toFixed(2)}
                                />
                                <YAxis
                                    type="number"
                                    dataKey="headshot"
                                    name="Headshot %"
                                    tickFormatter={(value) => `${value}%`}
                                    domain={[0, 100]}
                                />

                                <ChartTooltip
                                    cursor={false}
                                    content={
                                        <ChartTooltipContent
                                            labelFormatter={(
                                                label,
                                                payload
                                            ) => {
                                                return (
                                                    payload?.[0]?.payload
                                                        ?.nome || ""
                                                );
                                            }}
                                            formatter={(value, name) => {
                                                if (
                                                    name === "headshot" ||
                                                    name === "Headshot %"
                                                ) {
                                                    const numValue =
                                                        Number(value);
                                                    return [
                                                        `${numValue}%`,
                                                        "Headshot %",
                                                    ];
                                                }
                                                if (
                                                    name === "kd" ||
                                                    name === "K/D"
                                                ) {
                                                    const numValue =
                                                        Number(value);
                                                    return [
                                                        numValue.toFixed(2),
                                                        "K/D",
                                                    ];
                                                }
                                                return [value, name];
                                            }}
                                        />
                                    }
                                />

                                <Scatter
                                    name="K/D vs Headshot"
                                    dataKey="headshot"
                                    fill="var(--color-kd)"
                                    shape="circle"
                                />
                            </ScatterChart>
                        </ResponsiveContainer>
                    )}
                </CardContent>

                <CardFooter className="flex justify-center items-center p-4 text-sm flex-shrink-0">
                    <ChartLegendContent
                        payload={[
                            {
                                value: "K/D vs Headshot %",
                                dataKey: "headshot",
                                type: "circle",
                                color: chartConfig.kd.color,
                            },
                        ]}
                    />
                </CardFooter>
            </Card>
        </ChartContainer>
    );
};
