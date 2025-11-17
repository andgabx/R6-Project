"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ActionCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    href: string;
    color: "green" | "red" | "blue" | "purple" | "orange";
}

const colorVariants = {
    green: {
        bg: "bg-green-500/10",
        icon: "text-green-600 dark:text-green-400",
        border: "border-green-500/20",
    },
    red: {
        bg: "bg-red-500/10",
        icon: "text-red-600 dark:text-red-400",
        border: "border-red-500/20",
    },
    blue: {
        bg: "bg-blue-500/10",
        icon: "text-blue-600 dark:text-blue-400",
        border: "border-blue-500/20",
    },
    purple: {
        bg: "bg-purple-500/10",
        icon: "text-purple-600 dark:text-purple-400",
        border: "border-purple-500/20",
    },
    orange: {
        bg: "bg-orange-500/10",
        icon: "text-orange-600 dark:text-orange-400",
        border: "border-orange-500/20",
    },
};

export const ActionCard = ({
    title,
    description,
    icon: Icon,
    href,
    color,
}: ActionCardProps) => {
    const colors = colorVariants[color];

    return (
        <Link href={href} className="block h-full">
            <Card
                className={cn(
                    "h-full flex flex-col hover:shadow-lg transition-all duration-300 cursor-pointer",
                    colors.border
                )}
            >
                <CardHeader className="flex-1">
                    <div className="flex items-center gap-3">
                        <div
                            className={cn(
                                "p-2 rounded-lg flex-shrink-0",
                                colors.bg,
                                colors.icon
                            )}
                        >
                            <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <CardTitle className="text-base">{title}</CardTitle>
                            <CardDescription className="text-sm mt-1">
                                {description}
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
            </Card>
        </Link>
    );
};

