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
                            color: "hsl(var(--primary))",
                        },
                    }}
                    className="mx-auto aspect-square h-[250px]"
                >
                    <RadarChart data={data}>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis />
                        <Radar
                            dataKey="value"
                            fill="var(--color-value)"
                            fillOpacity={0.6}
                            stroke="var(--color-value)"
                        />
                    </RadarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
