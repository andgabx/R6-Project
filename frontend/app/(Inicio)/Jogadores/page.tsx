"use client";

import { useState } from "react";

import { Users } from "lucide-react";

import ListAll from "./components/ListAll";
import { Jogador } from "@/types/jogador";
import { CreatePlayerButton } from "@/components/create-player-button";

export default function JogadoresPage() {
    const [jogadores, setJogadores] = useState<Jogador[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [refreshKey, setRefreshKey] = useState(0);

    const handlePlayerCreated = () => {
        // Força o recarregamento da lista
        setRefreshKey((prev) => prev + 1);
    };

    const handleRefresh = () => {
        setRefreshKey((prev) => prev + 1);
    };

    return (
        <div className="mx-auto p-4 md:p-12">
            <header className="mb-8">
                <h1 className="text-4xl font-bold flex items-center gap-3">
                    <Users className="h-10 w-10 text-primary" />
                    Gerenciamento de Jogadores
                </h1>
                <p className="text-muted-foreground">
                    Adicione, remova, atualize e consulte informações sobre os
                    jogadores.
                </p>
            </header>

            <ListAll
                key={refreshKey}
                jogadores={jogadores}
                setJogadores={setJogadores}
                loading={loading}
                setLoading={setLoading}
                error={error}
                setError={setError}
                onRefresh={handleRefresh}
            />
            <CreatePlayerButton onPlayerCreated={handlePlayerCreated} />
        </div>
    );
}
