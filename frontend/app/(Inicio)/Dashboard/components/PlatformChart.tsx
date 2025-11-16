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
        // ... (lógica de config inalterada)
        const config: ChartConfig = {};
        platformChartData.forEach((item, index) => {
            config[item.name] = {
                label: item.name,
                color: `hsl(var(--chart-${index + 1}))`,
            };
        });
        return config;
    }, [platformChartData]);

    // 👇 INÍCIO DA MUDANÇA: ChartContainer agora envolve o Card
    return (
        <ChartContainer
            config={platformChartConfig}
            className="w-full" // Adicione classes de largura/layout aqui, se necessário
        >
            <Card className="flex flex-col">
                <CardHeader className="items-center pb-0">
                    <CardTitle>Jogadores por Plataforma</CardTitle>
                    <CardDescription>
                        Análise da distribuição de jogadores
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 items-center justify-center pb-0">
                    {/* 👇 MUDANÇA: Adicionado um <div> para o estilo 
                      que antes estava no ChartContainer 
                    */}
                    <div className="mx-auto aspect-square w-full max-w-[250px]">
                        {/* 👇 INÍCIO DA MUDANÇA: Adicione o ResponsiveContainer */}
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
                        {/* 👆 FIM DA MUDANÇA */}
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