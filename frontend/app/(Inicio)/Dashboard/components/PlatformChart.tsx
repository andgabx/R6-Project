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
    ChartLegendContent, // Note: O shadcn/charts exporta ChartLegendContent
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Jogador } from "@/types/jogador";

interface PlatformChartProps {
    players: Jogador[];
}

export const PlatformChart = ({ players }: PlatformChartProps) => {
    const platformChartData = useMemo(() => {
        // ... (lógica de dados inalterada)
        return players.reduce((acc, player) => {
            const platform = player.dados?.plataforma || "Desconhecida";
            const existing = acc.find((item) => item.name === platform);
            if (existing) {
                existing.value++;
            } else {
                acc.push({ name: platform, value: 1 });
            }
            return acc;
        }, [] as { name: string; value: number }[]);
    }, [players]);

    const platformChartConfig = useMemo(() => {
        const config: ChartConfig = {};
        platformChartData.forEach((item, index) => {
            const chartIndex = (index % 5) + 1; // Cicla entre chart-1 a chart-5
            config[item.name] = {
                label: item.name,
                color: `var(--chart-${chartIndex})`,
            };
        });
        return config;
    }, [platformChartData]);

    return (
        <ChartContainer
            config={platformChartConfig}
            className="w-full h-[400px]"
        >
            <Card className="flex flex-col h-full">
                <CardHeader className="items-center pb-0">
                    <CardTitle>Jogadores por Plataforma</CardTitle>
                    <CardDescription>
                        Análise da distribuição de jogadores
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 items-center justify-center pb-0">
                    <div className="mx-auto aspect-square w-full max-w-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie data={platformChartData} dataKey="value" nameKey="name" innerRadius={60}>
                                    {platformChartData.map((entry) => (
                                        <Cell
                                            key={`cell-${entry.name}`}
                                            fill={
                                                platformChartConfig[entry.name]
                                                    ?.color
                                            }
                                        />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">
                    {/* 👇 ISTO AGORA FUNCIONA: Está dentro do ChartContainer */}
                    <ChartLegendContent
                        payload={platformChartData.map((item) => ({
                            value: item.name,
                            type: "circle",
                            color: platformChartConfig[item.name]?.color,
                        }))}
                    />
                </CardFooter>
            </Card>
        </ChartContainer> // FIM DA MUDANÇA
    );
};