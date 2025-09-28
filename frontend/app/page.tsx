import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-10">
            <h1 className="text-5xl font-bold mb-8">Bem-vindo ao Projeto R6</h1>
            <p className="text-lg text-gray-400 mb-12 text-center">
                Navegue pelas diferentes seções abaixo para gerenciar e consultar informações.
            </p>
            <p className="text-lg text-gray-400 mb-12 text-center">
                Essa interface foi criada para a entrega do dia 30/09.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                <Link href="/Armas" className="bg-gray-800 p-8 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-300">
                    <h2 className="text-3xl font-bold mb-4 text-blue-400">Gerenciamento de Armas</h2>
                    <p className="text-gray-300">
                        Consulte, crie, atualize e delete informações sobre as armas do jogo.
                    </p>
                </Link>
                <Link href="/Jogadores" className="bg-gray-800 p-8 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-300">
                    <h2 className="text-3xl font-bold mb-4 text-green-400">Gerenciamento de Jogadores</h2>
                    <p className="text-gray-300">
                        Consulte, crie, atualize e delete informações sobre os jogadores.
                    </p>
                </Link>
                <Link href="/Graficos" className="bg-gray-800 p-8 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-300 col-span-1 md:col-span-2">
                    <h2 className="text-3xl font-bold mb-4 text-purple-400">Gráficos</h2>
                    <p className="text-gray-300">
                        Visualize gráficos com informações sobre jogadores e armas.
                    </p>
                </Link>
            </div>
        </div>
    );
}
