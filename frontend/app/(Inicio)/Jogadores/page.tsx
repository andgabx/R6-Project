"use client";

import { useState } from "react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Users,
    AlertTriangle,
    Loader2,
} from "lucide-react";

import ListAll from "./components/ListAll";
import FindById from "./components/FindById";
import Create from "./components/Create";
import Update from "./components/Update";
import Delete from "./components/Delete";
import MinKd from "./components/MinKd";
import MinWinRate from "./components/MinWinRate";
import MinLevel from "./components/MinLevel";
import { Button } from "@/components/ui/button";
import { Jogador } from "@/types/jogador";

type TabType =
    | "listAll"
    | "findById"
    | "create"
    | "update"
    | "delete"
    | "minKd"
    | "minWinRate"
    | "minLevel";

export default function JogadoresPage() {
    const [activeTab, setActiveTab] = useState<TabType>("listAll");
    const [jogadores, setJogadores] = useState<Jogador[]>([]);
    const [jogador, setJogador] = useState<Jogador | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [isNotFoundModalOpen, setIsNotFoundModalOpen] = useState(false);
    const [searchId, setSearchId] = useState<number>(0);

    const handleError = (error: unknown, message: string) => {
        console.error(message, error);
        const errorMessage =
            error instanceof Error ? error.message : "Erro desconhecido";
        setError(`${message}: ${errorMessage}`);
    };

    const renderContent = (tab: TabType) => {
        switch (tab) {
            case "listAll":
                return <ListAll jogadores={jogadores} setJogadores={setJogadores} loading={loading} setLoading={setLoading} error={error} setError={setError} handleError={handleError} />;
            case "findById":
                return <FindById jogador={jogador} setJogador={setJogador} loading={loading} setLoading={setLoading} error={error} setError={setError} handleError={handleError} isNotFoundModalOpen={isNotFoundModalOpen} setIsNotFoundModalOpen={setIsNotFoundModalOpen} />;
            case "create":
                return <Create setJogador={setJogador} loading={loading} setLoading={setLoading} error={error} setError={setError} handleError={handleError} />;
            case "update":
                return <Update jogadores={jogadores} setJogadores={setJogadores} loading={loading} setLoading={setLoading} error={error} setError={setError} handleError={handleError} />;
            case "delete":
                return <Delete jogadores={jogadores} setJogadores={setJogadores} loading={loading} setLoading={setLoading} error={error} setError={setError} handleError={handleError} />;
            case "minKd":
                return <MinKd jogadores={jogadores} setJogadores={setJogadores} loading={loading} setLoading={setLoading} error={error} setError={setError} handleError={handleError} />;
            case "minWinRate":
                return <MinWinRate jogadores={jogadores} setJogadores={setJogadores} loading={loading} setLoading={setLoading} error={error} setError={setError} handleError={handleError} />;
            case "minLevel":
                return <MinLevel jogadores={jogadores} setJogadores={setJogadores} loading={loading} setLoading={setLoading} error={error} setError={setError} handleError={handleError} />;
            default:
                return null;
        }
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

            {error && (
                <Card className="bg-destructive/10 border-destructive text-destructive-foreground mb-6">
                    <CardContent className="p-4 flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5" />
                        <p>{error}</p>
                    </CardContent>
                </Card>
            )}

            {loading && (
                <Card className="bg-primary/10 border-primary text-primary-foreground mb-6">
                    <CardContent className="p-4 flex items-center gap-3">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <p>Carregando...</p>
                    </CardContent>
                </Card>
            )}

            <Tabs
                value={activeTab}
                onValueChange={(value) => setActiveTab(value as TabType)}
                className="w-full"
            >
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 h-auto">
                    <TabsTrigger value="listAll">Listar Todos</TabsTrigger>
                    <TabsTrigger value="findById">Buscar por ID</TabsTrigger>
                    <TabsTrigger value="create">Criar</TabsTrigger>
                    <TabsTrigger value="update">Atualizar</TabsTrigger>
                    <TabsTrigger value="delete">Deletar</TabsTrigger>
                    <TabsTrigger value="minKd">K/D Mín.</TabsTrigger>
                    <TabsTrigger value="minWinRate">Win Rate Mín.</TabsTrigger>
                    <TabsTrigger value="minLevel">Nível Mín.</TabsTrigger>
                </TabsList>
                <TabsContent value={activeTab} className="mt-6">
                    {renderContent(activeTab)}
                </TabsContent>
            </Tabs>

            {/* Not Found Modal */}
            <Dialog
                open={isNotFoundModalOpen}
                onOpenChange={setIsNotFoundModalOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Busca sem Resultados</DialogTitle>
                        <DialogDescription>
                            Nenhum jogador foi encontrado com o ID{" "}
                            <strong className="text-primary">{searchId}</strong>
                            . Por favor, tente um ID diferente.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => setIsNotFoundModalOpen(false)}>
                            Fechar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
