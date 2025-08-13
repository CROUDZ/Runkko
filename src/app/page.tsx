"use client";

import dynamic from "next/dynamic";
import Head from "next/head";

const Header = dynamic(() => import("@/components/Header"), {
  ssr: false,
});
const HeroSection = dynamic(() => import("@/components/sections/HeroSection"), {
  ssr: false,
});
const LastVideosSection = dynamic(
  () => import("@/components/sections/LastVideosSection"),
  {
    ssr: false,
  },
);

export default function Home() {
  return (
    <>
      <Head>
        <title>Runkko - Le YouTuber à découvrir !</title>

        <link rel="icon" href="/favicon.webp" type="image/webp" />

        <meta name="description" content="Découvrez Runkko, le YouTuber à suivre absolument ! Profitez de ses contenus exclusifs sur la plateforme vidéo innovante Runkko." />
        <meta name="keywords" content="Runkko, YouTuber, vidéos, influenceur, exclusif, publicité, streaming, tendances" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://runkko.netlify.app//" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Runkko - Le YouTuber à découvrir !" />
        <meta property="og:description" content="Découvrez Runkko, le YouTuber à suivre absolument ! Profitez de ses contenus exclusifs sur la plateforme vidéo innovante Runkko." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://runkko.netlify.app//" />
        <meta property="og:image" content="https://runkko.netlify.app//favicon.webp" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Runkko - Le YouTuber à découvrir !" />
        <meta name="twitter:description" content="Découvrez Runkko, le YouTuber à suivre absolument ! Profitez de ses contenus exclusifs sur la plateforme vidéo innovante Runkko." />
        <meta name="twitter:image" content="https://runkko.netlify.app//favicon.webp" />
        <meta name="twitter:site" content="@runkko" />
        <meta name="twitter:creator" content="@runkko" />

      </Head>
      <div>
        <Header />
        <HeroSection />
        <LastVideosSection />
      </div>
    </>
  );
}
