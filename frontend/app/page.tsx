"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Shield,
    Target,
    Users,
    Trophy,
    Gamepad2,
    Crosshair,
    Map,
    BarChart3,
    ArrowRight,
    Activity,
    Award,
    Zap,
} from "lucide-react";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function HomePage() {
    const [showWelcomeModal, setShowWelcomeModal] = useState(true);

    const navigationCards = [
        {
            title: "Dashboard",
            description:
                "Visão geral das estatísticas e métricas principais da plataforma",
            icon: BarChart3,
            href: "/Dashboard",
            color: "text-primary",
            bgColor: "bg-primary/10",
            stats: "Análises em tempo real",
        },
        {
            title: "Jogadores",
            description:
                "Gerencie perfis, rankings e estatísticas detalhadas dos jogadores",
            icon: Users,
            href: "/Jogadores",
            color: "text-chart-1",
            bgColor: "bg-chart-1/10",
            stats: "Perfis completos",
        },
        {
            title: "Operadores (AINDA NÃO IMPLEMENTADO)",
            description:
                "Explore habilidades, estatísticas e loadouts dos operadores",
            icon: Shield,
            href: "/operators",
            color: "text-chart-2",
            bgColor: "bg-chart-2/10",
            stats: "Explore os Operadores",
        },
        {
            title: "Arsenal",
            description:
                "Catálogo completo de armas, acessórios e equipamentos",
            icon: Crosshair,
            href: "/Armas",
            color: "text-chart-3",
            bgColor: "bg-chart-3/10",
            stats: "Armas & Acessórios",
        },
        {
            title: "Partidas (AINDA NÃO IMPLEMENTADO)",
            description:
                "Histórico de partidas, mapas e análise de performance",
            icon: Trophy,
            href: "/matches",
            color: "text-chart-4",
            bgColor: "bg-chart-4/10",
            stats: "Histórico completo",
        },
        {
            title: "Mapas (AINDA NÃO IMPLEMENTADO)",
            description:
                "Informações detalhadas sobre todos os mapas competitivos",
            icon: Map,
            href: "/maps",
            color: "text-chart-5",
            bgColor: "bg-chart-5/10",
            stats: "Mapas oficiais",
        },
    ];

    return (
        <div className=" bg-background">
            <main className="container mx-auto px-4 py-4">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4 text-balance">
                        Central de Comando Tático
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                        Acesse todas as funcionalidades da plataforma através
                        dos módulos organizados abaixo. Cada seção oferece
                        ferramentas especializadas para análise e gerenciamento.
                    </p>
                </div>

                {/* Navigation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {navigationCards.map((card, index) => (
                        <Link key={index} href={card.href} className="group">
                            <Card
                                key={index}
                                className="bg-card border-border hover:shadow-lg transition-all duration-300 group cursor-pointer"
                            >
                                <CardHeader className="pb-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <div
                                            className={`p-3 rounded-lg ${card.bgColor}`}
                                        >
                                            <card.icon
                                                className={`h-8 w-8 ${card.color}`}
                                            />
                                        </div>
                                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                    <CardTitle className="text-xl mb-2">
                                        {card.title}
                                    </CardTitle>
                                    <CardDescription className="text-pretty">
                                        {card.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">
                                            {card.stats}
                                        </span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                                            asChild
                                        ></Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
