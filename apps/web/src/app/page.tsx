import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";

export default function Home() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            {/* Hero Section */}
            <section className="container mx-auto px-6 py-24 text-center">
                <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-violet-500 to-indigo-600 bg-clip-text text-transparent">
                    Velocy SAAS Platform
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Plateforme SAAS moderne construite avec <strong>Next.js 14+</strong>, <strong>NestJS</strong>, et le Design System <strong>Deep Flow</strong>.
                </p>
                <div className="flex gap-4 justify-center">
                    <Button size="lg" className="text-lg">
                        Démarrer Gratuitement →
                    </Button>
                    <Button size="lg" variant="outline" className="text-lg">
                        Voir la Démo
                    </Button>
                </div>
            </section>

            {/* Features Grid */}
            <section className="container mx-auto px-6 py-16">
                <h3 className="text-3xl font-bold text-center mb-12">Technologies Utilisées</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Card 1 - Next.js */}
                    <div className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <div className="text-4xl mb-4">🚀</div>
                        <h4 className="text-xl font-semibold mb-2 text-card-foreground">Next.js 14+</h4>
                        <p className="text-muted-foreground mb-4">
                            App Router avec TypeScript et Tailwind CSS
                        </p>
                        <Button variant="secondary" size="sm">En savoir plus</Button>
                    </div>

                    {/* Card 2 - NestJS */}
                    <div className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <div className="text-4xl mb-4">⚡</div>
                        <h4 className="text-xl font-semibold mb-2 text-card-foreground">NestJS</h4>
                        <p className="text-muted-foreground mb-4">
                            Backend performant sur le port 4000
                        </p>
                        <Button variant="secondary" size="sm">En savoir plus</Button>
                    </div>

                    {/* Card 3 - PostgreSQL */}
                    <div className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <div className="text-4xl mb-4">🐘</div>
                        <h4 className="text-xl font-semibold mb-2 text-card-foreground">PostgreSQL</h4>
                        <p className="text-muted-foreground mb-4">
                            Base de données robuste avec Prisma ORM
                        </p>
                        <Button variant="secondary" size="sm">En savoir plus</Button>
                    </div>

                    {/* Card 4 - Design System */}
                    <div className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <div className="text-4xl mb-4">🎨</div>
                        <h4 className="text-xl font-semibold mb-2 text-card-foreground">Deep Flow</h4>
                        <p className="text-muted-foreground mb-4">
                            Design System avec shadcn/ui et Geist
                        </p>
                        <Button variant="secondary" size="sm">En savoir plus</Button>
                    </div>
                </div>
            </section>

            {/* Button Variants Demo */}
            <section className="container mx-auto px-6 py-16 bg-mute">
                <h3 className="text-3xl font-bold text-center mb-12">Composants du Design System</h3>
                <div className="max-w-4xl mx-auto bg-card border rounded-lg p-8">
                    <h4 className="text-xl font-semibold mb-6">Button Variants</h4>
                    <div className="space-y-6">
                        {/* Default */}
                        <div className="flex flex-wrap gap-3 items-center">
                            <span className="w-32 text-sm text-muted-foreground">Default:</span>
                            <Button>Button</Button>
                            <Button size="sm">Small</Button>
                            <Button size="lg">Large</Button>
                        </div>

                        {/* Secondary */}
                        <div className="flex flex-wrap gap-3 items-center">
                            <span className="w-32 text-sm text-muted-foreground">Secondary:</span>
                            <Button variant="secondary">Button</Button>
                            <Button variant="secondary" size="sm">Small</Button>
                            <Button variant="secondary" size="lg">Large</Button>
                        </div>

                        {/* Outline */}
                        <div className="flex flex-wrap gap-3 items-center">
                            <span className="w-32 text-sm text-muted-foreground">Outline:</span>
                            <Button variant="outline">Button</Button>
                            <Button variant="outline" size="sm">Small</Button>
                            <Button variant="outline" size="lg">Large</Button>
                        </div>

                        {/* Ghost */}
                        <div className="flex flex-wrap gap-3 items-center">
                            <span className="w-32 text-sm text-muted-foreground">Ghost:</span>
                            <Button variant="ghost">Button</Button>
                            <Button variant="ghost" size="sm">Small</Button>
                            <Button variant="ghost" size="lg">Large</Button>
                        </div>

                        {/* Destructive */}
                        <div className="flex flex-wrap gap-3 items-center">
                            <span className="w-32 text-sm text-muted-foreground">Destructive:</span>
                            <Button variant="destructive">Button</Button>
                            <Button variant="destructive" size="sm">Small</Button>
                            <Button variant="destructive" size="lg">Large</Button>
                        </div>

                        {/* Link */}
                        <div className="flex flex-wrap gap-3 items-center">
                            <span className="w-32 text-sm text-muted-foreground">Link:</span>
                            <Button variant="link">Button</Button>
                            <Button variant="link" size="sm">Small</Button>
                            <Button variant="link" size="lg">Large</Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Color Palette Demo */}
            <section className="container mx-auto px-6 py-16">
                <h3 className="text-3xl font-bold text-center mb-12">Palette de Couleurs Deep Flow</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                    <div className="bg-primary text-primary-foreground p-6 rounded-lg text-center">
                        <div className="font-semibold">Primary</div>
                        <div className="text-sm opacity-90">Violet Vibrant</div>
                    </div>
                    <div className="bg-secondary text-secondary-foreground p-6 rounded-lg text-center">
                        <div className="font-semibold">Secondary</div>
                        <div className="text-sm opacity-75">Slate Doux</div>
                    </div>
                    <div className="bg-accent text-accent-foreground p-6 rounded-lg text-center">
                        <div className="font-semibold">Accent</div>
                        <div className="text-sm opacity-75">Survols</div>
                    </div>
                    <div className="bg-destructive text-destructive-foreground p-6 rounded-lg text-center">
                        <div className="font-semibold">Destructive</div>
                        <div className="text-sm opacity-90">Rose Moderne</div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t mt-24">
                <div className="container mx-auto px-6 py-8 text-center text-muted-foreground">
                    <p>Propulsé par Turborepo + Next.js + NestJS + shadcn/ui</p>
                    <p className="text-sm mt-2">Design System: Deep Flow 🎨</p>
                </div>
            </footer>
        </div>
    );
}
