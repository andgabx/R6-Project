"use client";

import { useEffect, useState } from "react";
import { jogadorService } from "@/services/JogadorService";
import { Jogador } from "@/types/jogador";
import { PlatformChart } from "./components/PlatformChart";
import { FavoriteMapChart } from "./components/FavoriteMapChart";
import { RankChart } from "./components/RankChart";
import { KdHorasChart } from "./components/KdHorasChart";
import { WlKdChart } from "./components/WinKdChart";

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

    return (
        <div className="container mx-auto p-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                <PlatformChart players={players} />
                <FavoriteMapChart players={players} />
                <RankChart players={players} />
                <KdHorasChart players={players} />
                <WlKdChart players={players} />
            </div>
        </div>
    );
};

export default DashboardPage;
