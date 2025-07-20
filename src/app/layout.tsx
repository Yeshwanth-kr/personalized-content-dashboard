// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { ReduxProvider } from "@/store/ReduxProvider";
import { ThemeManager } from "@/components/ThemeManager";

export const metadata: Metadata = {
  title: "Personalized Content Dashboard",
  description: "Your daily dashboard for news, media, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full vsc-initialized">
        <ReduxProvider>
          <ThemeManager>{children}</ThemeManager>
        </ReduxProvider>
      </body>
    </html>
  );
}
