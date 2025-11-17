"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
    title: string;
    value: string | number;
    change?: {
        value: number;
        isPositive: boolean;
    };
    description?: string;
    icon?: React.ReactNode;
}

export const MetricCard = ({
    title,
    value,
    change,
    description,
    icon,
}: MetricCardProps) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon && <div className="text-muted-foreground">{icon}</div>}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {change && (
                    <div
                        className={cn(
                            "flex items-center text-xs mt-1",
                            change.isPositive
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"
                        )}
                    >
                        {change.isPositive ? (
                            <ArrowUp className="h-3 w-3 mr-1" />
                        ) : (
                            <ArrowDown className="h-3 w-3 mr-1" />
                        )}
                        {change.isPositive ? "+" : ""}
                        {change.value}%
                    </div>
                )}
                {description && (
                    <p className="text-xs text-muted-foreground mt-1">
                        {description}
                    </p>
                )}
            </CardContent>
        </Card>
    );
};

