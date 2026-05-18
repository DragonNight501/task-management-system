import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Management System",
  description:
    "A modern animated task management system built with Next.js, TypeScript, and Tailwind CSS.",
  keywords: [
    "Task Manager",
    "Next.js",
    "TypeScript",
    "Productivity App",
    "Kanban Board",
  ],
  authors: [{ name: "Mohamad Hadi Dabbah Aljimal" }],
  metadataBase: new URL("https://mohamad-dabbah-task.vercel.app"),
  openGraph: {
    title: "Task Management System",
    description:
      "Modern animated task management system built with Next.js and TypeScript.",
    url: "https://mohamad-dabbah-task.vercel.app",
    siteName: "Task Management System",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
