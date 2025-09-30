"use client";

import { useEffect, useMemo, useState } from "react";
import { Cell, Legend, Pie, PieChart } from "recharts";

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
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { jogadorService } from "@/services/JogadorService";
import { Jogador } from "@/types/jogador";
import Image from "next/image";
import { Tooltip } from "@/components/ui/tooltip";

const images = [
    {
        src: "/graficos/Bar/mediawinrateoperadoresataque.jpeg",
        alt: "mediawinrateoperadoresataque",
    },
    {
        src: "/graficos/Bar/mediawinrateoperadoresdefesa.jpeg",
        alt: "mediawinrateoperadoresdefesa",
    },
    {
        src: "/graficos/Bar/operadoresdeataquemaisescolhidos.jpeg",
        alt: "operadoresdeataquemaisescolhidos",
    },
    {
        src: "/graficos/Bar/operadoresdefesamaisescolhidos.jpeg",
        alt: "operadoresdefesamaisescolhidos",
    },
    { src: "/graficos/Bar/playerporrle.jpeg", alt: "playerporrle" },
    { src: "/graficos/Others/jogadoresporrank.jpeg", alt: "jogadoresporrank" },
    { src: "/graficos/Pizza/MapasFavoritos.jpeg", alt: "MapasFavoritos" },
    { src: "/graficos/Pizza/Plataforma.jpeg", alt: "Plataforma" },
    { src: "/graficos/Pizza/preferencia.jpeg", alt: "preferencia" },
    { src: "/graficos/Scatter/headshotxkd.jpeg", alt: "headshotxkd" },
    {
        src: "/graficos/Scatter/horasjogadasxheadshot.jpeg",
        alt: "horasjogadasxheadshot",
    },
    { src: "/graficos/Scatter/kdxheadshots.jpeg", alt: "kdxheadshots" },
    {
        src: "/graficos/Scatter/winrateataquexwinratedefesa.jpeg",
        alt: "winrateataquexwinratedefesa",
    },
    { src: "/graficos/Scatter/wlxkd.jpeg", alt: "wlxkd" },
];

const DashboardPage = () => {
    const [players, setPlayers] = useState<Jogador[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allPlayers = await jogadorService.listAll();
                setPlayers(allPlayers);
            } catch (error) {
                console.error("Failed to fetch players:", error);
            }
        };

        fetchData();
    }, []);

    const platformChartData = useMemo(() => {
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
            config[item.name] = {
                label: item.name,
                color: `hsl(var(--chart-${index + 1}))`,
            };
        });
        return config;
    }, [platformChartData]);

    const favoriteMapChartData = useMemo(() => {
        return players.reduce((acc, player) => {
            const mapName = player.dados?.mapaFavorito?.nome || "Desconhecido";
            const existing = acc.find((item) => item.name === mapName);
            if (existing) {
                existing.value++;
            } else {
                acc.push({ name: mapName, value: 1 });
            }
            return acc;
        }, [] as { name: string; value: number }[]);
    }, [players]);

    const favoriteMapChartConfig = useMemo(() => {
        const config: ChartConfig = {};
        favoriteMapChartData.forEach((item, index) => {
            config[item.name] = {
                label: item.name,
                color: `hsl(var(--chart-${index + 1}))`,
            };
        });
        return config;
    }, [favoriteMapChartData]);

    // Recharts pie chart colors
    const COLORS = [
        "#0088FE",
        "#00C49F",
        "#FFBB28",
        "#FF8042",
        "#AA336A",
        "#33AA99",
    ];

    // Calculate platform distribution as percentages
    const platformData = useMemo(() => {
        const counts: Record<string, number> = {};
        players.forEach((player) => {
            const platform = (player.plataforma as string) || "Unknown";
            counts[platform] = (counts[platform] || 0) + 1;
        });
        const total = players.length;
        return Object.entries(counts).map(([name, value]) => ({
            name,
            // store percentage value (0-100)
            value: total > 0 ? (value / total) * 100 : 0,
        }));
    }, [players]);

    return (
        <div className="container mx-auto p-4">
         

            {/* Images gallery from /graficos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                {images.map(({ src, alt }) => (
                    <Card key={src} className="flex flex-col shadow">
                        <CardHeader>
                            <CardTitle className="text-sm text-center">
                                {alt}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center justify-center p-4">
                            <Image
                                src={src}
                                alt={alt}
                                width={400}
                                height={300}
                                className="object-contain"
                                priority={false}
                            />
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card className="flex flex-col">
                    <CardHeader className="items-center pb-0">
                        <CardTitle>Jogadores por Plataforma</CardTitle>
                        <CardDescription>
                            Análise da distribuição de jogadores
                        </CardDescription>
                    </CardHeader>
                    <ChartContainer
                        config={platformChartConfig}
                        className="mx-auto flex w-full flex-grow flex-col items-center"
                    >
                        <CardContent className="flex-1 pb-0">
                            <PieChart className="h-[250px]">
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                    data={platformChartData}
                                    dataKey="value"
                                    nameKey="name"
                                >
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
                        </CardContent>
                        <CardFooter className="flex-col gap-2 text-sm">
                            <ChartLegend
                                content={<ChartLegendContent nameKey="name" />}
                                className="-mx-2 flex-wrap"
                            />
                        </CardFooter>
                    </ChartContainer>
                </Card>

                <Card className="flex flex-col">
                    <CardHeader className="items-center pb-0">
                        <CardTitle>Mapas Favoritos</CardTitle>
                        <CardDescription>
                            Análise da distribuição dos mapas favoritos
                        </CardDescription>
                    </CardHeader>
                    <ChartContainer
                        config={favoriteMapChartConfig}
                        className="mx-auto flex w-full flex-grow flex-col items-center"
                    >
                        <CardContent className="flex-1 pb-0">
                            <PieChart className="h-[250px]">
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                    data={favoriteMapChartData}
                                    dataKey="value"
                                    nameKey="name"
                                >
                                    {favoriteMapChartData.map((entry) => (
                                        <Cell
                                            key={`cell-${entry.name}`}
                                            fill={
                                                favoriteMapChartConfig[
                                                    entry.name
                                                ]?.color
                                            }
                                        />
                                    ))}
                                </Pie>
                            </PieChart>
                        </CardContent>
                        <CardFooter className="flex-col gap-2 text-sm">
                            <ChartLegend
                                content={<ChartLegendContent nameKey="name" />}
                                className="-mx-2 flex-wrap"
                            />
                        </CardFooter>
                    </ChartContainer>
                </Card>
            </div>
            <Image
                src="/graficos/Bar/mediawinrateoperadoresataque.jpeg"
                alt="Gráfico de Média de Winrate por Operador de Ataque"
                width={500}
                height={300}
            />
            <Image
                src="/graficos/Bar/mediawinrateoperadoresdefesa.jpeg"
                alt="Gráfico de Média de Winrate por Operador de Ataque"
                width={500}
                height={300}
            />
            <Image
                src="/graficos/Bar/operadoresdeataquemaisescolhidos"
                alt="Gráfico de Média de Winrate por Operador de Defesa"
                width={500}
                height={300}
            />
            <Image
                src="/graficos/Bar/mediatempopartida.jpeg"
                alt="Gráfico de Média de Tempo por Partida"
                width={500}
                height={300}
            />
            <Image
                src="/graficos/Bar/mediatempopartida.jpeg"
                alt="Gráfico de Média de Tempo por Partida"
                width={500}
                height={300}
            />
            <Image
                src="/graficos/Bar/mediatempopartida.jpeg"
                alt="Gráfico de Média de Tempo por Partida"
                width={500}
                height={300}
            />
            <Image
                src="/graficos/Bar/mediatempopartida.jpeg"
                alt="Gráfico de Média de Tempo por Partida"
                width={500}
                height={300}
            />
            <Image
                src="/graficos/Bar/mediatempopartida.jpeg"
                alt="Gráfico de Média de Tempo por Partida"
                width={500}
                height={300}
            />
            <Image
                src="/graficos/Bar/mediatempopartida.jpeg"
                alt="Gráfico de Média de Tempo por Partida"
                width={500}
                height={300}
            />
        </div>
    );
};

export default DashboardPage;
