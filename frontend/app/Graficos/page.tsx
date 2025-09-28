"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Pie,
  PieChart,
  Cell,
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
import { jogadorService } from "../../services/JogadorService";
import { Jogador } from "../../types/jogador";

const barChartConfig = {
  kd: {
    label: "K/D",
    color: "#2563eb",
  },
  winRate: {
    label: "Win Rate",
    color: "#60a5fa",
  },
  level: {
    label: "Level",
    color: "#34d399",
  },
};

const pieChartColors = ["#fde047", "#f97316", "#ef4444"];

export default function Graficos() {
  const [barChartData, setBarChartData] = useState<Jogador[]>([]);
  const [pieChartData, setPieChartData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await jogadorService.listAll();
        setBarChartData(data);

        const winRate30 = data.filter((j) => j.winRate > 30).length;
        const winRate50 = data.filter((j) => j.winRate > 50).length;
        const winRate70 = data.filter((j) => j.winRate > 70).length;

        setPieChartData([
          { name: "Win Rate > 30%", value: winRate30 },
          { name: "Win Rate > 50%", value: winRate50 },
          { name: "Win Rate > 70%", value: winRate70 },
        ]);
      } catch (error) {
        console.error("Erro ao buscar dados dos jogadores:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-10 flex flex-col items-center justify-center gap-8">
      <Card className="bg-gray-800 border-gray-700 text-white w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Gráfico de Jogadores</CardTitle>
          <CardDescription>
            Visualização do K/D, Win Rate e Level dos jogadores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={barChartConfig}>
            <BarChart
              accessibilityLayer
              data={barChartData}
              layout="vertical"
              margin={{
                left: 20,
              }}
            >
              <CartesianGrid
                horizontal={false}
                strokeDasharray="3 3"
                stroke="rgba(255, 255, 255, 0.2)"
              />
              <YAxis
                dataKey="nickname"
                type="category"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "white" }}
              />
              <XAxis type="number" hide />
              <ChartTooltip
                cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
                content={
                  <ChartTooltipContent className="bg-gray-700 border-gray-600 text-white" />
                }
              />
              <Bar dataKey="kd" fill={barChartConfig.kd.color} radius={4} />
              <Bar
                dataKey="winRate"
                fill={barChartConfig.winRate.color}
                radius={4}
              />
              <Bar
                dataKey="level"
                fill={barChartConfig.level.color}
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700 text-white w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Distribuição de Win Rate</CardTitle>
          <CardDescription>
            Percentual de jogadores por faixa de win rate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}}>
            <PieChart width={400} height={400}>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={pieChartColors[index % pieChartColors.length]}
                  />
                ))}
              </Pie>
              <ChartTooltip
                cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
                content={
                  <ChartTooltipContent className="bg-gray-700 border-gray-600 text-white" />
                }
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
