"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";
import { useState } from "react";

interface PerformanceChartProps {
    data: Array<{
        month: string;
        value: number;
    }>;
}

export const PerformanceChart = ({ data }: PerformanceChartProps) => {
    const [activeTab, setActiveTab] = useState("workflows");

    const chartConfig = {
        value: {
            label: "Valor",
            color: "var(--chart-1)",
        },
    };

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="flex-shrink-0">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Performance Analytics</CardTitle>
                        <CardDescription>
                            Tendências de execução e métricas do sistema
                        </CardDescription>
                    </div>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList>
                            <TabsTrigger value="workflows">
                                Workflows
                            </TabsTrigger>
                            <TabsTrigger value="sales">Vendas</TabsTrigger>
                            <TabsTrigger value="views">
                                Visualizações
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col min-h-0">
                <ChartContainer
                    config={chartConfig}
                    className="flex-1 min-h-[300px]"
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="month"
                                tick={{ fill: "hsl(var(--muted-foreground))" }}
                            />
                            <YAxis
                                tick={{ fill: "hsl(var(--muted-foreground))" }}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="var(--chart-1)"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};
