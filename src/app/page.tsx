"use client";

import dynamic from "next/dynamic";

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
    <div>
      <Header />
      <HeroSection />
      <LastVideosSection />
    </div>
  );
}
