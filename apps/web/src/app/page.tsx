export default function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <main className="max-w-4xl mx-auto px-6 py-12 text-center">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-gray-200 dark:border-gray-700">
                    <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Velocy
                    </h1>
                    <p className="text-2xl text-gray-700 dark:text-gray-300 mb-8">
                        Votre plateforme SAAS moderne
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                        <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                            <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-300 mb-2">
                                🚀 Next.js 14+
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                App Router avec TypeScript et Tailwind CSS
                            </p>
                        </div>

                        <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                            <h2 className="text-xl font-semibold text-purple-900 dark:text-purple-300 mb-2">
                                ⚡ NestJS
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Backend performant sur le port 4000
                            </p>
                        </div>

                        <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                            <h2 className="text-xl font-semibold text-green-900 dark:text-green-300 mb-2">
                                📦 Turborepo
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Monorepo optimisé avec mise en cache
                            </p>
                        </div>

                        <div className="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                            <h2 className="text-xl font-semibold text-orange-900 dark:text-orange-300 mb-2">
                                🎯 pnpm
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Gestion de paquets rapide et efficace
                            </p>
                        </div>
                    </div>

                    <div className="mt-12">
                        <a
                            href="http://localhost:4000/health"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                            Tester l'API →
                        </a>
                    </div>
                </div>
            </main>

            <footer className="mt-auto py-8 text-center text-gray-500 dark:text-gray-400">
                <p>Propulsé par Turborepo + Next.js + NestJS</p>
            </footer>
        </div>
    );
}
