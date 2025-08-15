"use client";

import React from "react";
import Image from "next/image";
import { m } from "framer-motion";

import Profile from "@/assets/profile.webp";

const Footer: React.FC = () => {
  return (
    <m.footer
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="transition-all duration-300 bg-black backdrop-blur-lg border-t border-white/10"
    >
      <nav className="container mx-auto flex justify-between items-center px-4 py-4">
        {/* Logo & Copyright */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Image
              src={Profile}
              alt="Runkko Avatar"
              width={36}
              height={36}
              className="rounded-full border-2 border-yellow-400 shadow-lg"
            />
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
              Runkko
            </h1>
            <p className="text-xs text-gray-400 -mt-1">
              © {new Date().getFullYear()} Runkko. Tous droits réservés.
            </p>
          </div>
        </div>

        {/* Crédit au centre */}
        <div className="flex flex-col items-center">
          <span className="text-sm text-white/80 font-medium">
            Site réalisé gratuitement et avec ❤️ par{" "}
            <a
              href="https://giovweb.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-yellow-400"
            >
              GiovWeb
            </a>
          </span>
        </div>

        {/* Social CTAs */}
        <div className="flex items-start flex-col space-y-2">
          <a
            href="https://www.youtube.com/@Runkko_YT"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 text-sm text-white/70 font-medium shadow-lg"
          >
            https://www.youtube.com/@Runkko_YT
          </a>

          <a
            href="https://discord.gg/t6U4hZDrnF"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 text-sm text-white/70 font-medium shadow-lg"
          >
            https://discord.gg/t6U4hZDrnF
          </a>
        </div>
      </nav>
    </m.footer>
  );
};

export default Footer;
