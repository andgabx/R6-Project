"use client";

import { Button } from "@/components/ui/button";
import { Shield, Zap } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";

export function Header() {
    return (
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/20">
                                    <Shield className="h-8 w-8 text-primary" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-balance">
                                        R6 Stats Platform
                                    </h1>
                                    <p className="text-muted-foreground">
                                        Rainbow Six Siege Analytics Hub
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="flex items-center gap-3">
                        <ThemeSwitcher />
                    </div>
                </div>
            </div>
        </header>
    );
}
