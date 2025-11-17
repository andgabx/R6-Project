"use client";

import { useState } from "react";

import { Users } from "lucide-react";

import ListAll from "./components/ListAll";
import { Jogador } from "@/types/jogador";

export default function JogadoresPage() {
    const [jogadores, setJogadores] = useState<Jogador[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");

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
                jogadores={jogadores}
                setJogadores={setJogadores}
                loading={loading}
                setLoading={setLoading}
                error={error}
                setError={setError}
            />
        </div>
    );
}
