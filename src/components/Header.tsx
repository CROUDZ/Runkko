"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import Profil from "@/assets/profile.webp";

const Header: React.FC = () => {
  return (
    <header className="bg-neutral-dark-gray text-neutral-white py-6 shadow-md sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-2">
          <Image
            src={Profil}
            alt="Runkko Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <p className="text-xl font-semibold">Runkko</p>
        </div>
        <ul className="flex space-x-6 text-sm font-medium">
          <li>
            <Link
              href="#home"
              className="hover:text-secondary-blue transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="#about"
              className="hover:text-secondary-blue transition-colors"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="#services"
              className="hover:text-secondary-blue transition-colors"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="hover:text-secondary-blue transition-colors"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
