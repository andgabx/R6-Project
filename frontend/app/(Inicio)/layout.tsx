"use client";
import {
    Sidebar,
    SidebarBody,
    SidebarLink,
    useSidebar,
} from "@/components/ui/sidebar";
import {
    Home,
    LayoutDashboard,
    Users,
    Shield,
    Crosshair,
    Map,
    Trophy,
    Target,
} from "lucide-react";
import { useState } from "react";
import { CreatePlayerButton } from "@/components/create-player-button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

function SidebarLogo() {
    const { open, animate } = useSidebar();
    return (
        <div className="flex items-center gap-3 px-3 py-4 mb-2 border-b border-sidebar-border">
            <Target className="h-6 w-6 text-sidebar-primary flex-shrink-0" />
            <motion.span
                animate={{
                    display: animate
                        ? open
                            ? "inline-block"
                            : "none"
                        : "inline-block",
                    opacity: animate ? (open ? 1 : 0) : 1,
                }}
                className="text-lg font-bold text-sidebar-foreground whitespace-nowrap tracking-tight"
            >
                R6 Project
            </motion.span>
        </div>
    );
}

export default function Layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const links = [
        {
            label: "Início",
            href: "/",
            icon: Home,
        },
        {
            label: "Dashboard",
            href: "/Dashboard",
            icon: LayoutDashboard,
        },
        {
            label: "Jogadores",
            href: "/Jogadores",
            icon: Users,
        },
        {
            label: "Operadores",
            href: "/Operadores",
            icon: Shield,
        },
        {
            label: "Armas",
            href: "/Armas",
            icon: Crosshair,
        },
        {
            label: "Mapas",
            href: "/Mapas",
            icon: Map,
        },
        {
            label: "Competitivo",
            href: "/Competitivo",
            icon: Trophy,
        },
    ];
    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col md:flex-row flex-1 w-full h-screen relative">
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-6 bg-sidebar">
                    <div className="flex flex-col flex-1">
                        {/* Logo/Título */}
                        <SidebarLogo />
                        <div className="flex flex-col gap-1">
                            {links.map((link, idx) => {
                                const Icon = link.icon;
                                const isActive =
                                    pathname === link.href ||
                                    (link.href !== "/" &&
                                        pathname.startsWith(link.href));
                                return (
                                    <SidebarLink
                                        key={idx}
                                        link={{
                                            ...link,
                                            icon: (
                                                <Icon
                                                    className={cn(
                                                        "h-5 w-5 flex-shrink-0 transition-colors",
                                                        isActive
                                                            ? "text-sidebar-primary"
                                                            : "text-sidebar-foreground/70 group-hover/sidebar:text-sidebar-foreground"
                                                    )}
                                                />
                                            ),
                                        }}
                                        className={cn(
                                            "rounded-lg px-3 py-2.5 transition-all duration-200",
                                            isActive
                                                ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm"
                                                : "hover:bg-sidebar-accent/50 text-sidebar-foreground/80 hover:text-sidebar-foreground"
                                        )}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </SidebarBody>
            </Sidebar>
            <main className="flex-1 overflow-y-auto">{children}</main>
            <CreatePlayerButton />
        </div>
    );
}
