import type { Metadata } from "next";
import "@/styles/globals.css";
import MotionProvider from "@/components/MotionProvider";
import { YouTubeProvider } from "@/contexts/YouTubeContext";

export const metadata: Metadata = {
  title: "Este_YTB - Le YouTuber à découvrir !",
  description:
    "Découvrez Este_YTB, le YouTuber à suivre absolument ! Profitez de ses contenus exclusifs sur la plateforme vidéo innovante Este_YTB.",
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
