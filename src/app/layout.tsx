import type { Metadata } from "next";
import "@/styles/globals.css";
import MotionProvider from "@/components/MotionProvider";
import { YouTubeProvider } from "@/contexts/YouTubeContext";

export const metadata: Metadata = {
  title: "Runkko - Le YouTuber à découvrir !",
  description:
    "Découvrez Runkko, le YouTuber à suivre absolument ! Profitez de ses contenus exclusifs sur la plateforme vidéo innovante Runkko.",
  icons: {
    icon: "/favicon.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.webp" type="image/webp" />
      </head>
      <body>
        <MotionProvider>
          <YouTubeProvider>{children}</YouTubeProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
