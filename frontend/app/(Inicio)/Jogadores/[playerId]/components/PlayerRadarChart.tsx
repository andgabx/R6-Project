"use client";

import {
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    RadarChart,
} from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

interface PlayerRadarChartProps {
    data: {
        subject: string;
        value: number;
    }[];
    title: string;
    description: string;
}

export function PlayerRadarChart({ data, title, description }: PlayerRadarChartProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={{
                        value: {
                            label: "Value",
                            color: "var(--chart-1)",
                        },
                    }}
                    className="mx-auto aspect-square h-[300px]"
                >
                    <RadarChart
                        data={data}
                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                        <defs>
                            <linearGradient id="radarFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.4} />
                                <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0.2} />
                            </linearGradient>
                        </defs>
                        <ChartTooltip
                            cursor={false}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-popover border border-border rounded-lg p-2 shadow-lg">
                                            <p className="text-popover-foreground font-semibold">
                                                {payload[0].payload.subject}
                                            </p>
                                            <p className="text-muted-foreground text-sm">
                                                {payload[0].value}%
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <PolarGrid
                            stroke="var(--border)"
                            strokeWidth={1}
                            strokeOpacity={0.3}
                            gridType="polygon"
                        />
                        <PolarAngleAxis
                            dataKey="subject"
                            tick={{
                                fill: "var(--foreground)",
                                fontSize: 12,
                                fontWeight: 500,
                            }}
                            tickLine={{ stroke: "var(--border)", strokeOpacity: 0.5 }}
                        />
                        <PolarRadiusAxis
                            angle={90}
                            domain={[0, 100]}
                            tick={false}
                            axisLine={false}
                        />
                        <Radar
                            name="Performance"
                            dataKey="value"
                            stroke="var(--chart-1)"
                            fill="url(#radarFill)"
                            fillOpacity={0.6}
                            strokeWidth={2}
                            dot={{ fill: "var(--chart-1)", r: 4 }}
                            activeDot={{ r: 6, fill: "var(--chart-2)" }}
                        />
                    </RadarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
