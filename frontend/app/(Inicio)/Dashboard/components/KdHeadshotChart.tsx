"use client";

import { useMemo } from "react";
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

interface KdHeadshotChartProps {
    players: Jogador[];
}

/**
 * Converte o valor de headshot de decimal para porcentagem
 * Headshot vem como decimal (0.38 = 38%), sempre multiplica por 100
 * @param headshotValue - Valor do headshot (pode ser número ou string com vírgula)
 * @returns Porcentagem do headshot (0-100)
 */
const convertHeadshotToPercent = (
    headshotValue: number | string | undefined | null
): number => {
    if (headshotValue === undefined || headshotValue === null) {
        console.log("convertHeadshotToPercent: valor é undefined ou null");
        return 0;
    }

    // Converter para string primeiro para normalizar (substituir vírgula por ponto)
    const headshotString = String(headshotValue).replace(",", ".");
    const headshotDecimal = parseFloat(headshotString);

    // Se não conseguir converter, retorna 0
    if (isNaN(headshotDecimal)) {
        console.log("convertHeadshotToPercent: não conseguiu converter", {
            original: headshotValue,
            string: headshotString,
        });
        return 0;
    }

    // Sempre multiplicar por 100, pois todos os valores vêm em formato decimal (0.38 = 38%)
    // O máximo que pode vir é 1 (que representa 100%)
    const result = headshotDecimal * 100;

    // Debug apenas para valores interessantes
    if (headshotDecimal > 0 && headshotDecimal < 1) {
        console.log("convertHeadshotToPercent:", {
            original: headshotValue,
            decimal: headshotDecimal,
            percent: result,
        });
    }

    return result;
};

export const KdHeadshotChart = ({ players }: KdHeadshotChartProps) => {
    // Primeiro: Processar e tratar os dados (converter headshot de decimal para porcentagem)
    const processedData = useMemo(() => {
        const filtered = players.filter(
            (player) =>
                player.dados?.kd !== undefined &&
                player.dados?.headshot !== undefined &&
                player.dados.kd > 0 &&
                player.dados.headshot >= 0
        );

        // Debug: verificar primeiros valores
        if (filtered.length > 0) {
            console.log(
                "Primeiros 3 valores de headshot (antes da conversão):",
                filtered.slice(0, 3).map((p) => ({
                    nome: p.nickname,
                    headshotOriginal: p.dados?.headshot,
                    tipo: typeof p.dados?.headshot,
                }))
            );
        }

        return filtered.map((player) => {
            // Tratar headshot: converter de decimal para porcentagem
            const headshotPercent = convertHeadshotToPercent(
                player.dados?.headshot
            );

            // Debug: verificar valores específicos
            if (player.nickname === "UbiFan") {
                console.log("Debug UbiFan:", {
                    original: player.dados?.headshot,
                    tipoOriginal: typeof player.dados?.headshot,
                    converted: headshotPercent,
                    kd: player.dados?.kd,
                });
            }

            return {
                kd: player.dados?.kd || 0,
                headshot: headshotPercent, // Já está em porcentagem (0-100)
                nome: player.nickname || "Desconhecido",
            };
        });
    }, [players]);

    // Segundo: Usar os dados já processados no gráfico
    const chartData = processedData;

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
                    {chartData.length === 0 ? (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-muted-foreground text-center">
                                Nenhum dado disponível para exibir. Os dados de
                                headshot precisam estar disponíveis.
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
                                    tickFormatter={(value) =>
                                        `${value.toFixed(1)}%`
                                    }
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
                                                        `${numValue.toFixed(
                                                            1
                                                        )}%`,
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
