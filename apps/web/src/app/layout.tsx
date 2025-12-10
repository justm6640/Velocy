import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Velocy - SAAS Platform",
    description: "Modern SAAS platform built with Next.js and NestJS",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
