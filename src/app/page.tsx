"use client";

import dynamic from "next/dynamic";
import Head from "next/head";
import SectionLoader from "@/components/LoadingSpinner";

const Header = dynamic(() => import("@/components/Header"), {
  ssr: false,
  loading: () => <SectionLoader message="Chargement de l'en-tête..." />,
});
const HeroSection = dynamic(() => import("@/components/sections/HeroSection"), {
  ssr: false,
  loading: () => <SectionLoader message="Chargement de la section héro..." />,
});
const SubscriberProgressSection = dynamic(
  () => import("@/components/sections/SubscriberProgressSection"),
  {
    ssr: false,
    loading: () => (
      <SectionLoader message="Chargement de la section d'avancement des abonnés..." />
    ),
  },
);
const LastVideosSection = dynamic(
  () => import("@/components/sections/LastVideosSection"),
  {
    ssr: false,
    loading: () => (
      <SectionLoader message="Chargement de la section des dernières vidéos..." />
    ),
  },
);

const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: false,
  loading: () => <SectionLoader message="Chargement du pied de page..." />,
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Este_YTB - Le YouTuber à découvrir !</title>

        <link rel="icon" href="/favicon.webp" type="image/webp" />

        <meta
          name="description"
          content="Découvrez Este_YTB, le YouTuber à suivre absolument ! Profitez de ses contenus exclusifs sur la plateforme vidéo innovante Este_YTB."
        />
        <meta
          name="keywords"
          content="Este_YTB, YouTuber, vidéos, influenceur, exclusif, publicité, streaming, tendances"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://este.netlify.app//" />

        {/* Open Graph / Facebook */}
        <meta
          property="og:title"
          content="Este_YTB - Le YouTuber à découvrir !"
        />
        <meta
          property="og:description"
          content="Découvrez Este_YTB, le YouTuber à suivre absolument ! Profitez de ses contenus exclusifs sur la plateforme vidéo innovante Este_YTB."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://este.netlify.app//" />
        <meta
          property="og:image"
          content="https://este.netlify.app//favicon.webp"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Este_YTB - Le YouTuber à découvrir !"
        />
        <meta
          name="twitter:description"
          content="Découvrez Este_YTB, le YouTuber à suivre absolument ! Profitez de ses contenus exclusifs sur la plateforme vidéo innovante Este_YTB."
        />
        <meta
          name="twitter:image"
          content="https://este.netlify.app//favicon.webp"
        />
        <meta name="twitter:site" content="@este" />
        <meta name="twitter:creator" content="@este" />
      </Head>
      <div>
        <Header />
        <HeroSection />
        <SubscriberProgressSection />
        <LastVideosSection />
      </div>
      <Footer />
    </>
  );
}
