import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { ClerkProvider } from "@clerk/nextjs";
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
        <ClerkProvider>
            <html lang="fr" className={GeistSans.variable}>
                <body className="antialiased font-sans">
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
