"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, ArrowRight } from "lucide-react";
import Link from "next/link";

export function CompetitiveTeams() {
    return (
        <Link href="/Competitivo" className="block group">
            <Card className="w-full transition-all hover:shadow-lg hover:scale-[1.01] cursor-pointer h-full">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                <Trophy className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                                    Times Competitivos
                                </CardTitle>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Explore os times profissionais e suas estatísticas
                                </p>
                            </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                </CardHeader>
            </Card>
        </Link>
    );
}

