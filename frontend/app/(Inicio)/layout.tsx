"use client";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
    IconArrowLeft,
    IconBrandTabler,
    IconSettings,
    IconUserBolt,
} from "@tabler/icons-react";
import { useState } from "react";
import { CreatePlayerButton } from "@/components/create-player-button";

export default function Layout({ children }: { children: React.ReactNode }) {
    const links = [
        {
            label: "Inicio",
            href: "/",
            icon: (
                <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Dashboard",
            href: "/Dashboard",
            icon: (
                <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Jogadores",
            href: "/Jogadores",
            icon: (
                <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Operadores",
            href: "/Operadores",
            icon: (
                <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
    ];
    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col md:flex-row flex-1 w-full h-screen relative">
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10 rounded-r-3xl">
                    <div className="flex flex-col flex-1">
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                </SidebarBody>
            </Sidebar>
            <main className="flex-1 overflow-y-auto">{children}</main>
                <CreatePlayerButton />

        </div>
    );
}
